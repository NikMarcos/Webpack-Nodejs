require('dotenv').config();
const qs = require('querystring');
const bodyParser = require('body-parser')
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const cors = require('cors');

const MongoClient = require('mongodb').MongoClient;
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const userRouter = require('./routes/user');
const signUpRouter = require('./routes/sign_up');
const signInRouter = require('./routes/sign_in');
const signOutRouter = require('./routes/sign_out');
const imageRouter = require('./routes/image');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);


const app = express();

// view engine setup
app.set('views', path.join(__dirname, './dist/views/pages/'));
app.set('view engine', 'pug');

app.use(logger('dev'));
// app.use(express.json());

 // handle json data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, './dist/assets/images/')));
app.use(express.static(path.join(__dirname, './dist/')));
app.use(express.static(path.join(__dirname, './uploads/')));
app.use(cors());
const store = new MongoStore({
  uri: 'mongodb://localhost:27017/webpack-express',
  collection: 'WBSessions'
});

app.use(session({
  name: 'action',
  secret: 'Very strange',
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // 1 week
  user: {author: true},
  httpOnly : true,
  store: store,
  secure: false,
  resave: false,
  saveUninitialized: false
}));

app.use('/', function (req, res, next) {

  let url = req.originalUrl;
  res.locals.path = url;
  console.log(res.locals.path);
  if (req.session.userLogin) {
    res.locals.login = req.session.userLogin;
  }
  // if (req.session.userName && req.session.userEmail) {
  //   res.locals.regstatus = 'true';
  //   next();
  // } else {
  res.cookie('userLogin', req.session.userLogin);
  next();
  // }
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/user', userRouter);
app.use('/sign_up', signUpRouter);
app.use('/sign_in', signInRouter);
app.use('/sign_out', signOutRouter);
app.use('/image/', imageRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
