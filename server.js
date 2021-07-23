const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT_SERVER;
const userRoute = require("./routes/user.routes");
const postRoute = require("./routes/post.routes");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./database");

app.get("/", (req, res, next) => {
  res.json({ message: "Message from server" });
  next()
});

app.use(userRoute);
app.use(postRoute);

app.listen(port, () => {
  console.log("Server is running ... ");
});

module.exports = app;
