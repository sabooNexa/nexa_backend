const express = require("express");
const mongoose = require("mongoose");
const route = require("./src/router/router");
const dotenv = require('dotenv'); // Import dotenv

dotenv.config(); // Load environment variables from .env file
var cors = require("cors");
const app = express();
//const multer= require("multer");

//app.use( multer().any())
app.use(express.json());
app.use(cors());

mongoose
  .connect(
    process.env.cluster,
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));
app.use("/", route);

app.listen(process.env.PORT || 3001, function () {
  console.log("Express app running on port " + (process.env.PORT || 3001));
});