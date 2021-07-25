const mongoose = require("mongoose");
require("dotenv").config();
const addressDatabase = process.env.DATABASE;

exports.connectDatabse = () => {
  mongoose
    .connect(addressDatabase, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() =>
      console.log("Server connect Database in ... " + addressDatabase)
    )
    .catch((errors) => {
      console.log("Connect with Database Fail. Reason: " + errors);
    });
};
