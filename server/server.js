const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config({ path: './.env.local' });

const postsRouter = require('./routes/postsRoutes');
const profileRouter = require('./routes/profileRoutes');
const usersRouter = require('./routes/usersRoutes');

const app = express();

// DB Config
const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

// Connect to MongoDB
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connection successful!'))
    .catch(err => console.error(err));

// Logger Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/api/v1/posts', postsRouter);
app.use('/api/v1/profile', profileRouter);
app.use('/api/v1/users', usersRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}...`));
