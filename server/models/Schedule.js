const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const md5 = require('md5');
const moment = require('moment');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const scheduleSchema = new Schema({
  date: {
    type: Date,
    required: 'Please provide a date',
    default: moment(new Date())
      .utc()
      .toDate()
  },
  subscribers: [
    {
      _id: false,
      slotType: { type: Number },
      hadPriority: { type: Boolean },
      user: { type: Schema.Types.ObjectId, ref: 'User' }
    }
  ]
});

module.exports = mongoose.model('Schedule', scheduleSchema);
