const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet')
const bodyParser = require('body-parser');
const sellerhubRoutes = require('./routes/sellerhubRoutes');
const loginRoutes = require('./routes/loginRoutes');
const orderRoutes = require('./routes/orderRoutes')
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT;

const jwt = require('jsonwebtoken');

mongoose.connect(process.env.DB_HOST)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(err => {
    console.error(err);
  });





app.use(bodyParser.json());
app.use(cors());
app.use(helmet())
app.use('/',orderRoutes);
app.use('/', sellerhubRoutes);
app.use("/", loginRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
