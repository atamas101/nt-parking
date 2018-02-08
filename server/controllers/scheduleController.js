const mongoose = require('mongoose');
const Schedule = mongoose.model('Schedule');
const promisify = require('es6-promisify');
const moment = require('moment');

exports.park = async (req, res, next) => {
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

exports.cancel = (req, res, next) => {
  res.json(req.body);
};
