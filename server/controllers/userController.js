const mongoose = require('mongoose');
const promisify = require('es6-promisify');
const moment = require('moment');

const User = mongoose.model('User');
const Schedule = mongoose.model('Schedule');

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name');
  req.checkBody('name', 'You must supply a name!').notEmpty();
  req.checkBody('email', 'That Email is not valid!').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    gmail_remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  req.checkBody('password', 'Password Cannot be Blank!').notEmpty();
  req
    .checkBody('password-confirm', 'Confirmed Password cannot be blank!')
    .notEmpty();
  req
    .checkBody('password-confirm', 'Oops! Your passwords do not match')
    .equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    res.json(errors);
    return; // stop the fn from running
  }
  next(); // there were no errors!
};

exports.register = async (req, res, next) => {
  const user = new User({
    email: req.body.email,
    name: req.body.name,
    isFirstPassword: true,
    hireDate: moment(req.body.hireDate)
      .startOf('day')
      .toDate()
  });
  const register = promisify(User.register, User);
  await register(user, req.body.password);
  res.json(user);
};

exports.getUsers = async (req, res, next) => {
  const users = await User.find({}).select({
    name: true,
    email: true,
    admin: true,
    hireDate: true
  });
  res.json(users);
};

exports.deleteUser = async (req, res, next) => {
  const userIdToDelete = req.params.id;
  await Schedule.update(
    {
      'subscribers.user': mongoose.Types.ObjectId(userIdToDelete)
    },
    {
      $pull: { subscribers: { user: userIdToDelete } }
    },
    { multi: true }
  );

  const user = await User.findByIdAndRemove(req.params.id, (err, usr) => {
    if (err) {
      next(err);
      return;
    }
    if (!usr) {
      res.json({ success: false, message: 'User not found' });
      return;
    }
    res.json({ success: true, message: 'User Deleted' });
  });
};

exports.updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(500).send('User not found!');
    return;
  }

  user.name = req.body.name;
  user.email = req.body.email;
  // user.admin = req.body.admin;
  user.hireDate = moment(req.body.hireDate)
    .startOf('day')
    .toDate();

  if (
    req.body.password &&
    req.body['password-confirm'] &&
    req.body.password === req.body['password-confirm']
  ) {
    const setPassword = promisify(user.setPassword, user);
    await setPassword(req.body.password);
    user.isFirstPassword = true;
  } else {
    res.status(500).send("Passwords don't match");
    return;
  }

  const updatedUser = await user.save();

  res.json(updatedUser);
};

exports.resetPassword = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(500).send('User not found!');
    return;
  }

  if (
    req.body.password &&
    req.body['password-confirm'] &&
    req.body.password === req.body['password-confirm']
  ) {
    const setPassword = promisify(user.setPassword, user);
    await setPassword(req.body.password);
    user.isFirstPassword = false;
  } else {
    res.status(500).send("Passwords don't match");
    return;
  }

  const updatedUser = await user.save();

  res.json(updatedUser);
};
