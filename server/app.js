const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const AppError = require('./utils/appError');
const rateLimiter = require('./utils/rateLimiter');
const globalErrorHandler = require('./controllers/handlers/globalErrorHandler');
const authRouter = require('./routes/authRoutes');
const postsRouter = require('./routes/postsRoutes');
const profileRouter = require('./routes/profileRoutes');
const userRouter = require('./routes/userRoutes');

// Start express app
const app = express();

// Set security HTTP headers
app.use(helmet());

// Implement CORS
app.use(cors());
app.options('*', cors());

// Logger middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Rate limiting middlewares
if (process.env.NODE_ENV === 'production') {
    app.use('/api', rateLimiter({ maxAttempts: 200, windowMinutes: 15 }));
    app.use('/api/v1/auth/login', rateLimiter());
    app.use('/api/v1/auth/register', rateLimiter());
    app.use('/api/v1/auth/forgot-password', rateLimiter());
    app.use('/api/v1/auth/reset-password', rateLimiter());
    app.use('/api/v1/auth/update-password', rateLimiter());
}

// Body-parsing middlewares
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded());

// Data sanitization against NoSQL query injection & XSS
app.use(mongoSanitize());
app.use(xss());

// Prevent parameter pollution
app.use(
    hpp({
        whitelist: [
            'duration',
            'ratingsQuantity',
            'ratingsAverage',
            'maxGroupSize',
            'difficulty',
            'price',
        ],
    }),
);

// Cookie-parsing middleware
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
