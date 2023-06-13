var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var messagesRouter = require('./routes/messages');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var speechRouter = require('./routes/SpeechSynthesis');
var speechtextRouter = require('./routes/SpeechSynth');
var registerRouter = require('./routes/register');
var registerHandlerRouter = require('./routes/registerHandler');
var loginHandlerRouter = require('./routes/loginHandler');
var addFriendHandlerRouter = require('./routes/addFriendHandler');
var translateRouter = require('./routes/translateMessage');

// var livereload = require("livereload");
// var connectLiveReload = require("connect-livereload");

// const liveReloadServer = livereload.createServer();
// liveReloadServer.server.once("connection", () => {
//     setTimeout(() => {
//         liveReloadServer.refresh("/");
//     }, 100);
// });

var app = express();

// app.use(connectLiveReload());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: true
    })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/userPage', (req, res) => {
    res.render('userPage');
});
app.use('/', indexRouter);
app.use('/messages', messagesRouter);

app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/loginHandler', loginHandlerRouter);
app.use('/SpeechSynthesis', speechRouter);
app.use('/SpeechSynth', speechtextRouter);
app.use('/register', registerRouter);
app.use('/registerHandler', registerHandlerRouter);
app.use('/addFriendHandler', addFriendHandlerRouter);
app.use('/translateMessage', translateRouter);
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