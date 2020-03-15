const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/handlers/globalErrorHandler');
const authRouter = require('./routes/authRoutes');
const postsRouter = require('./routes/postsRoutes');
const profileRouter = require('./routes/profileRoutes');
const userRouter = require('./routes/userRoutes');

// Start express app
const app = express();

// Global Middlewares
// Implement CORS
app.use(cors());
app.options('*', cors());

// Logger Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Body-parsing Middleware
app.use(express.json({ extended: false }));

// Cookie-parsing Middleware
app.use(cookieParser());

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/posts', postsRouter);
app.use('/api/v1/profile', profileRouter);
app.use('/api/v1/user', userRouter);

// Unhandled route handler
app.all('*', (req, res, next) =>
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404)),
);

// Global Error Handling Middleware
app.use(globalErrorHandler);

module.exports = app;
