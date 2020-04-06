const multer = require('multer');
const AppError = require('./appError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Uploaded file is not an image!', 400), false);
    }
};

const multerImageUpload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

module.exports = multerImageUpload;
