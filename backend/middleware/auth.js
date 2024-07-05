const ErrorHander = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }
  
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  
  req.user = await User.findById(decodedData.id);
  next();
});

exports.authorizeRoles = (...roles) => { //The (...) syntax in JavaScript is known as the rest parameter syntax. It allows a function to accept an indefinite number of arguments as an array. This is particularly useful when you don't know how many arguments will be passed to the function, or when you want to work with a variable number of parameters.
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {//checking whether the user with this role exist
      return next(
        new ErrorHander(
          `Role: ${req.user.role} is not allowed to access this resource `,
          403
        )
      );
    }
     
    next();
  };
};