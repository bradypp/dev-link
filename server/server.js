/* eslint-disable no-console */
/* eslint-disable no-process-exit */
require('dotenv').config({ path: './.env.local' });

// Handle any uncaught ex
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! Shutting down...');
    if (process.env.NODE_ENV === 'development') {
        console.error(err);
    } else {
        console.error(err.name, err.message);
    }
    process.exit(1);
});

const app = require('./app');
const connectDB = require('./config/db');

connectDB();

const port = process.env.PORT || 5000;

const server = app.listen(port, () => console.log(`Server running on port ${port}...`));

// Final error handling safety net
process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! Shutting down...');
    if (process.env.NODE_ENV === 'development') {
        console.error(err);
    } else {
        console.error(err.name, err.message);
    }
    server.close(() => process.exit(1));
});
