const mongoose = require('mongoose');

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

const mongoOpts = {
  poolSize: 20,
  reconnectTries: Number.MAX_SAFE_INTEGER,
  socketTimeoutMS: 480000,
  keepAlive: 300000
};
// Connect to our Database and handle an bad connections
mongoose.connect(
  process.env.DATABASE,
  mongoOpts
);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', err => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// READY?! Let's go!

// import all of our models
require('./server/models/User');
require('./server/models/Schedule');

// Start our app!
const app = require('./server/app');
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
