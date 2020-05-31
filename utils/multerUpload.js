const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AppError = require('./appError');

aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    region: 'eu-west-2',
});

const s3 = new aws.S3();

const multerStorage = multerS3({
    s3,
    bucket: 'dev-link',
    acl: 'public-read',
    metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
        cb(null, Date.now().toString());
    },
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Uploaded file is not an image!', 400), false);
    }
};

const multerUpload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

module.exports = multerUpload;
