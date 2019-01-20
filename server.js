const http = require('http');
const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

//connect to database
mongoose.connect(
  `mongodb://${process.env.MONGO_USER}:${
    process.env.MONGO_PASS
  }@ds013584.mlab.com:13584/marktplace`,
  { useNewUrlParser: true }
);

const productRoutes = require('./api/routes/products');

const server = http.createServer(app);

// app config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, GET, PATCH');
    return res.status(200).json({});
  }
  next();
});

// Routing to API endpoints
app.use('/v1/products', productRoutes);

// handling calls to non existing endpoints
app.use((req, res, next) => {
  res
    .status(404)
    .json({ message: "The page you're trying to connect does not exist" });
  const error = new Error('Page not found');
  next(error);
});

//handling errors
app.use((error, res, next) => {
  res.status(err.status || 500);
  console.log(error.message);
  res.json({
    error: {
      message:
        "An ERROR has occurred. Please don't panic, usually is not your fault. But we are cheking it out anyways"
    }
  });
});

server.listen(port, () => {
  console.log('Magic happens at port', port);
});
