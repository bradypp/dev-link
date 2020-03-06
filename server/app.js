const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

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

// Body-parsing Middleware
app.use(express.json({ extended: false }));

// Cookie-parsing middleware
app.use(cookieParser());

// 3) Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/posts', postsRouter);
app.use('/api/v1/profile', profileRouter);
app.use('/api/v1/users', usersRouter);

module.exports = app;
