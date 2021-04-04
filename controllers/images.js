const fetch = require('node-fetch');

const upload = require('../util/s3');

exports.postImage = async (req, res, next) => {

  upload(req, res, async (err) => {

    // this is for heroku, they say last item in X-Forwarded-For is the real orgininating ip address
    const forwardedFor = req.header('X-Forwarded-For').split(',');
    const realIp = forwardedFor[forwardedFor.length - 1];

    const cResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET_KEY}&response=${encodeURIComponent(req.body.cToken)}&remoteip=${encodeURIComponent(realIp)}`
    );
    const cData = await cResponse.json();

    if (cResponse.status !== 200 || cData.success === false) {
      return res.status(422).json({
        message: 'failed captcha',
        error: cData
      });
    }

    if (err) {
      switch (err.code) {
        case 'LIMIT_FILE_SIZE':
          return res.status(422).json({
            code: 'LIMIT_FILE_SIZE',
            // custom message here because the default error isn't detailed enough
            message: 'File is too large (2MB maximum)'
          });
        case 'INVALID_FILE_TYPE':
          return res.status(422).json({
            code: 'INVALID_FILE_TYPE',
            message: err.message
          });
        default:
          return res.status(500).json({
            code: 'UNKOWN',
            message: 'An unknown error occured'
          });
      }
    } else {
      res.status(200).json({
        url: 'https://d1i1z0o4f585f4.cloudfront.net/' + req.file.key
      });
    }
  });
};