/* eslint-disable no-process-exit */
require('dotenv').config({ path: './.env.local' });

const app = require('./app');
const connectDB = require('./config/db');

connectDB();

const port = process.env.PORT || 5000;

// eslint-disable-next-line no-console
const server = app.listen(port, () => console.log(`Server running on port ${port}...`));

// Server error handling event
process.on('unhandledRejection', err => {
    console.error(err.name, err.message);
    // Close server and exit the app
    server.close(() => process.exit(1));
});
