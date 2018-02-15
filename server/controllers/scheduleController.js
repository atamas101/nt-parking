const mongoose = require('mongoose');
const Schedule = mongoose.model('Schedule');
const promisify = require('es6-promisify');
const moment = require('moment');
const PARKING_SPOTS = 3;
const PARK_DEADLINE = 2; // Hours before midnight
const PARK_LIMIT = 14; // Days available in future

exports.subscribe = async (req, res, next) => {
  const query = { date: req.body.date };
  const data = {
    operation: req.body.operation,
    user: req.user._id,
    slotType: req.body.preference
  };
  const options = { upsert: true, new: true };
  // Remove the subscription if it exists
  let daySchedule = await Schedule.findOneAndUpdate(
    query,
    {
      $pull: { subscribers: { user: data.user } }
    },
    options
  ).populate('subscribers.user');
  // Add back new subscriptionrs
  if (data.operation === 'park') {
    if (parkingIsAvailable(req.body.date)) {
      daySchedule = await Schedule.findOneAndUpdate(
        query,
        {
          $push: { subscribers: { user: data.user, slotType: data.slotType } }
        },
        options
      ).populate('subscribers.user');
    } else {
      res
        .status(401)
        .send(
          'Parking not available for date: ' + moment(req.body.date).toDate()
        );
      return;
    }
  }

  let sortedSubs = daySchedule.subscribers
    ? sortByHireDate(daySchedule.subscribers)
    : [];
  const output = {
    date: daySchedule.date,
    alocated: sortedSubs.slice(0, PARKING_SPOTS),
    others: sortedSubs.slice(PARKING_SPOTS)
  };

  res.json(output);
};

parkingIsAvailable = date => {
  const now = moment();
  const deadLine = moment(date)
    .clone()
    .add(-PARK_DEADLINE, 'hour');
  const parkLimit = now
    .clone()
    .add(PARK_LIMIT, 'days')
    .endOf('week');
  return (
    now.isBefore(deadLine, 'minute') && moment(date).isBefore(parkLimit, 'day')
  );
};

sortByHireDate = users => {
  return users.sort((userA, userB) => {
    const dateA = moment(userA.user.hireDate);
    const dateB = moment(userB.user.hireDate);
    return dateA.diff(dateB, 'days');
  });
};

exports.getWeek = async (req, res, next) => {
  const weekNo = req.params.weekNo;
  const startDate = moment()
    .day('Monday')
    .isoWeek(weekNo)
    .startOf('day')
    .toDate();
  const endDate = moment()
    .day('Friday')
    .isoWeek(weekNo)
    .endOf('day')
    .toDate();

  const schedules = await Schedule.find(
    {
      $and: [{ date: { $lte: endDate } }, { date: { $gte: startDate } }]
    },
    ['date', 'subscribers'],
    {
      sort: {
        date: 1
      }
    }
  ).populate('subscribers.user');

  const output = schedules.map(day => {
    let sortedSubs = day.subscribers ? sortByHireDate(day.subscribers) : [];
    return {
      date: day.date,
      alocated: sortedSubs.slice(0, PARKING_SPOTS),
      others: sortedSubs.slice(PARKING_SPOTS)
    };
  });

  res.json(output);
};
