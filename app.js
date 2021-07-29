const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require('morgan');
const port = process.env.PORT_SERVER;
const userRoute = require("./routes/user.routes");
const postRoute = require("./routes/post.routes");
const database = require("./database");
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Blog Api",
      description: "Blog Api",
      contact: {
        name: "dinhchanhnghia2409@gmail.com"
      },
      servers: ["http://localhost:8080"]
    }
  },
  
  apis: ['./routes/*.js']
};

const openapiSpecification = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));


 app.get('/', (req, res, next) => {
  res.send('Server say hello....!');
  next();
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
