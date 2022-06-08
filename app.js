// imported express packages
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
//cors and Logan
const logger = require("morgan");
const cors=require("cors");
/*const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');*/

// routes
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");

//           initialise express app
const app = express();

// view engine setup
app.engine('pug', require('pug').__express);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, "public")));
//app.use(express.static(path.join(__dirname, "public/app")));
/*app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});*/
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/books", booksRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
/*app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
*/
// connecting to mongodb atlas
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB server: ${connect.connection.host}`);
  } catch (err) {
    console.error(err.message);
    //process.exit(1);
  }
};

const PORT = process.env.PORT || 6000;
/*mongoose.connect('mongodb://'+'192.168.43.1'+'/'+'usersdb',
  (err)=>{
     if(err){
        console.log(err)
        }
     console.log("Connect")
  }
);
mongoose.Promise=global.Promise;*/
connectDB();
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
module.exports = app;
