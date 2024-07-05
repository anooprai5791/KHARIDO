//to handle errors ,we made a class(globally) so that all errors get handled from here,not each are done one by one(see error.js in middleware)
class ErrorHandler extends Error {
      constructor(message,statusCode){ //as we were writing res.status and msg everytime,it will be given from here
        super(message);//pass to constructor of Error class
        this.statusCode = statusCode;
        Error.captureStackTrace(this,this.constructor); //what is stack trace?,uses of stack trace(Stack traces help developers understand the sequence of function calls that led to an error, making it easier to identify and fix the root cause of the problem.)
      }
    }
    module.exports = ErrorHandler;