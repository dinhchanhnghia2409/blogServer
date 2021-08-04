const express = require("express");
const route = express.Router();
const uploadFile = require("../middleware/FileUpload");
const File = require('../models/file.model');
const authentication = require('../middleware/Authentication');
const fileController = require('../controllers/file.controller');


route.post(
  "/upload-file",authentication,
  uploadFile.upload.single("file"),
  (req, res, next) => {
    const file = req.file;
    const uploadBy = req.user;
    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }
    const Url = file.path;
    fileController.uploadFile(Url,uploadBy,res)
    // res.send(file);
  }
);


module.exports = route;
