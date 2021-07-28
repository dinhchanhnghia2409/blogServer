const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require('morgan');
const port = process.env.PORT_SERVER;
const userRoute = require("./routes/user.routes");
const postRoute = require("./routes/post.routes");
const database = require("./database");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.get("/",(req, res, next) => {
  res.json({ message: "Message from server" });
  next()
});

app.use(userRoute);
app.use(postRoute);

const runServer = async (port) => {
  await database.connectDatabse();
  await app.listen(port, () => {
    console.log("Server is running ... ");
  });
};

runServer(port);

module.exports = app;
