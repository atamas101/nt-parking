const mongoose = require('mongoose');
const Schedule = mongoose.model('Schedule');
const promisify = require('es6-promisify');
const moment = require('moment');

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
    daySchedule = await Schedule.findOneAndUpdate(
      query,
      {
        $push: { subscribers: { user: data.user, slotType: data.slotType } }
      },
      options
    ).populate('subscribers.user');
  }

  console.log(daySchedule);

  res.json(daySchedule);
};

sortByHireDate = users => {
  return users.sort((userA, userB) => {
    const dateA = moment(userA.user.hireDate);
    const dateB = moment(userB.user.hireDate);
    console.log(
      userA.user.hireDate,
      userB.user.hireDate,
      dateA.diff(dateB, 'days')
    );
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

  console.log(weekNo, startDate, endDate);

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
    console.log(day);
    return {
      date: day.date,
      alocated: sortedSubs.slice(0, 3),
      others: sortedSubs.slice(3, -1)
    };
  });

  res.json(output);
};
