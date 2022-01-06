const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
  // const newUser = await User.create(req.body);

  // more secure as anyone cannot define extra field other than specified
  // anyone cannot define admin field or role due to this
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.passsword,
    passwordConfirm: req.body.passwordConfirm,
  });

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});
