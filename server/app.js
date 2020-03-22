const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const AppError = require('./utils/appError');
const rateLimiter = require('./config/rateLimiter');
const hppConfig = require('./config/hppConfig');
const globalErrorHandler = require('./utils/globalErrorHandler');
const postsRouter = require('./routes/postsRoutes');
const profileRouter = require('./routes/profileRoutes');
const userRouter = require('./routes/userRoutes');

// Start express app
const app = express();

// Set security HTTP headers
app.use(helmet());

// Implement CORS
app.use(
    cors({
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200,
        credentials: true,
    }),
);
app.options('*', cors());

// Logger middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Rate limiting middlewares
if (process.env.NODE_ENV === 'production') {
    app.use('/api', rateLimiter({ maxAttempts: 200, windowMinutes: 15 }));
    app.use(
        '/api/v1/user/sign-in',
        rateLimiter({ message: 'Too many login attempts, please try again later!' }),
    );
    app.use(
        '/api/v1/user/forgot-password',
        rateLimiter({ message: 'Too many password recovery attempts, please try again later!' }),
    );
    app.use(
        '/api/v1/user/reset-password',
        rateLimiter({ message: 'Too many password recovery attempts, please try again later!' }),
    );
}

// Body-parsing & cookie parsing middlewares
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection & XSS
app.use(mongoSanitize());
app.use(xss());

// Prevent parameter pollution errors by disabling duplicates in the query string (unless whitelisted in the config)
app.use(hpp(hppConfig));

// Routes
app.use('/api/v1/posts', postsRouter);
app.use('/api/v1/profile', profileRouter);
app.use('/api/v1/user', userRouter);

// Unhandled route handler
app.all('*', (req, res, next) =>
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404)),
);

// Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
