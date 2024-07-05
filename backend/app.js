//In Express.js (and Node.js in general), require() is used to import modules and packages into your application. It allows you to include built-in Node.js modules, third-party libraries, and your own custom modules
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");


const errorMiddleware = require("./middleware/error");

dotenv.config({path:"Backend/config/config.env"});

//app.use() is a versatile and essential method in Express.js for adding middleware to handle various aspects of request processing
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload({useTempFiles:true}));
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: false,
}))


const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");


app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);


app.use(errorMiddleware);
module.exports = app;
//npm i bcryptjs jsonwebtoken validator nodemailer cookie-parser body-parser   -->see all these packages