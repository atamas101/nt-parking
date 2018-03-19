const mongoose = require('mongoose');
const Schedule = mongoose.model('Schedule');
const promisify = require('es6-promisify');
const moment = require('moment');
const PARKING_SPOTS = 3;
const PARK_DEADLINE = 4; // Hours before (utc) midnight
const PARK_LIMIT = 14; // Days available in future
const flatMap = require('lodash.flatmap');
const groupBy = require('lodash.groupby');

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
    if (parkingIsAvailable(req.body.date, daySchedule.subscribers.length)) {
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

parkingIsAvailable = (date, count) => {
  console.log(count);
  const now = moment().utc();
  const deadLine = moment(date)
    .clone()
    .startOf('day')
    .add(-PARK_DEADLINE, 'hour');
  const parkLimit = now
    .clone()
    .startOf('day')
    .add(PARK_LIMIT, 'days')
    .endOf('week');
  console.log(now, deadLine);
  return (
    count <= PARKING_SPOTS ||
    (now.isBefore(deadLine, 'minute') &&
      moment(date).isBefore(parkLimit, 'day'))
  );
};

sortByHireDate = users => {
  return users.sort((userA, userB) => {
    const dateA = moment(userA.user.hireDate);
    const dateB = moment(userB.user.hireDate);
    return dateA.diff(dateB, 'days');
  });
};

getIntervalSchedule = async (startDate, endDate) => {
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
  return output;
};

exports.getWeek = async (req, res, next) => {
  const weekNo = req.params.weekNo;
  const startDate = moment()
    .utc()
    .day('Monday')
    .isoWeek(weekNo)
    .startOf('day')
    .toDate();
  const endDate = moment()
    .utc()
    .day('Friday')
    .isoWeek(weekNo)
    .endOf('day')
    .toDate();

  const output = await getIntervalSchedule(startDate, endDate);

  res.json(output);
};

exports.getStats = async (req, res, next) => {
  const weekNo = moment().isoWeek();
  // Last 30 days
  const startDate = moment()
    .utc()
    .day('Monday')
    .isoWeek(weekNo)
    .startOf('day')
    .add(-30, 'day')
    .toDate();
  const endDate = moment()
    .utc()
    .day('Friday')
    .isoWeek(weekNo)
    .endOf('day')
    .toDate();

  const schedules = await getIntervalSchedule(startDate, endDate);

  // alocated
  const userStats = groupBy(
    flatMap(schedules, item => item.alocated),
    i => i.user.name
  );
  let alocated = {};
  for (let user in userStats) {
    alocated[user] = userStats[user].length;
  }
  // others
  const otherStats = groupBy(
    flatMap(schedules, item => item.others),
    i => i.user.name
  );
  let others = {};
  for (let user in otherStats) {
    others[user] = otherStats[user].length;
  }

  res.json({ parked: alocated, waited: others });
};
