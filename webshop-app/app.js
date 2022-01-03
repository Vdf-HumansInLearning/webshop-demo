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

// middleware
let getUser = function(req, res, next) {
    console.log('LOGGED');

    if (!req.url.startsWith('/stylesheets') && !req.url.startsWith('/javascripts')) {
        let admin = false;
        let loggedIn = false;
        if (req.cookies.user_role === "admin") {
            admin = true;
        }

        req.admin = admin;

        if (req.cookies.user_role && req.cookies.user_id) {
            loggedIn = true;
        }

        req.loggedIn = loggedIn;

        if (loggedIn) {
            axios.get(`http://localhost:3001/users/${req.cookies.user_id}`)
                .then(function(response) {
                    // handle success
                    const user = response.data;
                    req.user = user;
                    console.log(user);
                    next();
                })
                // .catch(function(error) {
                //     // handle error
                //     res.status(400).send("404 Not Found");
                // });
        }
        // console.log('LOGGED');
    }
    console.log('LOGGED');
    next();
}




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use(getUser);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/phones', phonesRouter);
app.use('/profile', profileRouter);
app.use('/cart', cartRouter);
app.use('/auth', authRouter);
app.use('/orders', ordersRouter);

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