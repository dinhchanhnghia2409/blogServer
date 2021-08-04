const multer = require("multer");
const shortid = require('shortid');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const fileFormat = ".jpg";
    const fileName = shortid.generate() + fileFormat;
 
    cb(null, fileName);
  },
});

exports.upload = multer({ storage: storage });
