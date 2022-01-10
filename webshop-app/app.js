const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const phonesRouter = require('./routes/phones');
const profileRouter = require('./routes/profile');
const cartRouter = require('./routes/cart');
const authRouter = require('./routes/auth');
const ordersRouter = require('./routes/orders');
const dotenv = require('dotenv');
const axios = require('axios').default;

const app = express();
dotenv.config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

// get user middleware that runs before each request
const getUser = function (req, res, next) {
    if (!(req.url.startsWith('/stylesheets') ||
        req.url.startsWith('/js') ||
        req.url.startsWith('/favicon'))) {

        // express requires the use of res.locals object for passing custom data 
        res.locals.admin = req.cookies.user_role === "admin";
        res.locals.loggedIn = req.cookies.user_role && req.cookies.user_id;

        if (res.locals.loggedIn) {
            axios.get(`http://localhost:3001/users/${req.cookies.user_id}`)
                .then(function (response) {
                    res.locals.user = response.data;
                    next();
                })
                .catch(function (error) {
                    // handle error
                    res.status(400).send("404 Not Found");
                });
        } else {
            // if user is not logged in, send request to next middleware immediately
            next();
        }
    } else {
        next();
    }
};
app.use(getUser);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/phones', phonesRouter);
app.use('/profile', profileRouter);
app.use('/cart', cartRouter);
app.use('/auth', authRouter);
app.use('/orders', ordersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // log the error
    console.log(err);

    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;