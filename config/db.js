const mongoose = require('mongoose');

// DB Config
const DB = process.env.MONGO_URI.replace('<password>', process.env.DB_PASSWORD);

// Connect to MongoDB
const connectDB = async () => {
    await mongoose.connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    });
    // eslint-disable-next-line no-console
    console.log('MongoDB connection successful!');
};

module.exports = connectDB;
