const mongoose = require("mongoose");
require("dotenv").config();
const addressDatabase = process.env.DATABASE;

mongoose.connect(addressDatabase, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}).then(()=>console.log("Server connect Database in ... " + addressDatabase));
