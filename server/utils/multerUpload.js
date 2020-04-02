const multer = require('multer');
const AppError = require('./appError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Uploaded profile photo is not an image!', 400), false);
    }
};

const multerUpload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

module.exports = multerUpload;
