#!/usr/bin/env node
const path = require('path')
const glob = require("glob")
const AWS = require('aws-sdk');
const {version} = require('../package.json');

const s3 = new AWS.S3();

const bucketName = 'cdn.tmb.cat';

const dirsToUpload = [
    'dist',
    'static'
];

const uploadToS3 = (files) => {
    files.map(file => {
        const filePath = path.join('icons', `v${version}`, file.replace('../', ''))
        let params = {Bucket: bucketName, Key: filePath, Body: file, ACL: 'public-read'};
        s3.upload(params, (err, data) => {
            if (err) {
                throw err;
            }
            console.log(`Uploaded ${filePath} OK!`);
        })
    })
}

dirsToUpload.map(dir => {
    glob(`../${dir}/**/*`, (er, files) => {
        uploadToS3(files)
    })
})



