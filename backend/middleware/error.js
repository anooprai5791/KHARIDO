const ErrorHandler = require("../utils/errorhandler");
module.exports = (err,req,res,next) => {
  err.statusCode = err.statusCode||500;
  err.message = err.message||"Internal Server Error";

  // wrong mongodb id errror(Cast Error)
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid : ${err.path}`;
    err = new ErrorHandler(message,400);
  }

  //Mongoose Dupliacte key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message,400);
  }

  //Wrong Jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, try again`;
    err = new ErrorHandler(message,400);
  }

  //JWT expire error
  if (err.name === "TokenExpireError") {
    const message = `Json Web Token is expired, try again`;
    err = new ErrorHandler(message,400);
  }
  
  res.status(err.statusCode).json({
    success:false,
    message:err.message
  });
}