# Imagehost Server

## Description
This is the backend for my image hosting service. You can upload .jpg, .jpeg, .png, and .webp files under 2MB, then you can access and share them via a URL. AWS S3 is used to store the images and CloudFront is used to serve them.

## Features
* Requires valid reCaptcha

## Built With
* Express
* AWS S3
* AWS CloudFront
* Google reCaptcha V2

## What I Learned
* AWS S3
* AWS CloudFront
* How to connect to AWS from a server
* How to set up Google reCaptcha

## Challenges
* Preventing abuse. To prevent abuse I implemented google reCaptcha V2. On the client, when the user completes a captcha they get a user response token. This token is then appended to the request to upload an image and then checked on the server. I also implemented checks on the file size and mimetype.
* Handling file uploads. To handle file uploads I used a package called ```multer```. Multer can extract data from the request, including files. It can also be used to validate those files to make sure they're right size/type.
* Serving images. I decided to use AWS S3 and CloudFront to store and serve images. I chose this because it's easy to set up/maintain and serving files from CloudFront is faster and cheaper than serving them directly from S3.
