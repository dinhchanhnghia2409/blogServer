const File = require("../models/file.model");

exports.uploadFile = (Url, uploadBy, res) => {
  const fileSave = new File({
    Url: Url,
    uploadBy: uploadBy,
  });

  fileSave.save().then(() => {
    res.status(201).json({ message: "Upload success!" });
  });
};
