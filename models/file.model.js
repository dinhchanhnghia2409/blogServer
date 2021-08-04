const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const fileSchema = new mongoose.Schema({
  Url: {
    type: String,
  },
  uploadBy: {
    type: ObjectId,
    ref: "User",
  },
});
const File = mongoose.model("File", fileSchema);

module.exports = File;
