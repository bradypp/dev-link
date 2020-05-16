const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const { AppError } = require('./utils');
const rateLimiter = require('./config/rateLimiter');
const errorHandler = require('./controllers/errorHandler');
const authRouter = require('./controllers/routes/authRoutes');
const profileRouter = require('./controllers/routes/profileRoutes');
const userRouter = require('./controllers/routes/userRoutes');

// Start express app
const app = express();

// Set html template engine to pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Set security HTTP headers
app.use(helmet());

// Implement CORS
app.use(
    cors({
        origin:
            process.env.NODE_ENV === 'development'
                ? 'http://localhost:3000'
                : 'https://boiling-atoll-38153.herokuapp.com/',
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

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/profile', profileRouter);
app.use('/api/v1/user', userRouter);

// Serve static assets from server
app.use(express.static(path.join(__dirname, 'public')));

// Serve client static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
}

// Unhandled route handler
app.all('*', (req, res, next) =>
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404)),
);

// Global error handling middleware
app.use(errorHandler);

module.exports = app;
