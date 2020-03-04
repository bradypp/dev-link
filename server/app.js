const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const authRouter = require('./routes/authRoutes');
const postsRouter = require('./routes/postsRoutes');
const profileRouter = require('./routes/profileRoutes');
const usersRouter = require('./routes/usersRoutes');

// 1) Start express app
const app = express();

// 2) Global Middlewares
// Logger Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
require('./config/passport')(passport);

// 3) Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/posts', postsRouter);
app.use('/api/v1/profile', profileRouter);
app.use('/api/v1/users', usersRouter);

module.exports = app;
