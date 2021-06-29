const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const path = require('path');

aws.config.update({
  region: 'us-east-1'
});

s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (
    // make sure the files mimetype is supported
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/webp' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    const error = new Error('Invalid file type, only .jpg, .jpeg, .png, and .webp are supported');
    error.code = 'INVALID_FILE_TYPE';
    error.field = file.fieldName;
    cb(
      error,
      false
    );
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: 'awsbucket-2193',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "TESTING_METADATA" });
    },
    key: (req, file, cb) => { // set the filename
      cb(null, Date.now().toString() + path.extname(file.originalname));
    },
    contentType: (req, file, cb) => { // set the content type, since mimetype has been validated we can use it
      cb(null, file.mimetype);
    }
  }),
  limits: { fileSize: 2100000 } // limit the file size to 2,1000,000 bytes
});



module.exports = upload.single('image');