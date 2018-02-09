const express = require('express');
const router = express.Router();

const userController = require('./controllers/userController');
const authController = require('./controllers/authController');
const scheduleController = require('./controllers/scheduleController');
const { catchErrors } = require('./handlers/errorHandlers');

router.post(
  '/subscribe',
  authController.isLoggedIn,
  catchErrors(scheduleController.subscribe)
  // scheduleController.park
);

router.get(
  '/schedule/:weekNo',
  authController.isLoggedIn,
  catchErrors(scheduleController.getWeek)
);

// 1. Validate the registration data
// 2. register the user
router.post(
  '/user/register',
  authController.isLoggedIn,
  userController.validateRegister,
  catchErrors(userController.register)
);

router.get(
  '/users',
  authController.isLoggedIn,
  catchErrors(userController.getUsers)
);

router.post(
  '/user/:id',
  authController.isAdmin,
  catchErrors(userController.updateUser)
);

router.delete(
  '/user/:id',
  authController.isAdmin,
  catchErrors(userController.deleteUser)
);

router.post('/login', authController.login);

router.get('/logout', authController.logout);

// router.post('/account/forgot', catchErrors(authController.forgot));
// router.get('/account/reset/:token', catchErrors(authController.reset));
// router.post(
//   '/account/reset/:token',
//   authController.confirmedPasswords,
//   catchErrors(authController.update)
// );

module.exports = router;
