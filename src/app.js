const express = require('express');
const routes = require('./routes/index.js');
const fileUpload = require('express-fileupload');
const cors = require("cors");
const morgan = require("morgan");
const mercadopago = require("mercadopago");
require('dotenv').config();

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

require('./db.js');

const server = express();

server.name = 'API';

// **Robust CORS Configuration (Consider Specific Origins):**
server.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000' || "https://railway.app" ||  "https://netlify.app" || "https://back-production-148d.up.railway.app" ||  "https://storecomputer.netlify.app", // Adjust based on your requirements
  credentials: true,
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
}));

// **Optimized File Upload:**
server.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './uploads'
}));

// **Flexible and Customizable Morgan Logging:**
server.use(morgan('dev'));  // Or choose a different format (common, combined, etc.)

server.use(express.json());

// **Unnecessary Custom CORS Middleware Removal:**
// The use of `cors` middleware provides more comprehensive configuration.

server.use('/', routes);

server.use(express.urlencoded({ extended: false }));

// **Enhanced Error Handling:**
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;

  // Log the error for detailed debugging (consider a dedicated logging library)
  console.error(err);

  res.status(status).json({ message }); // Use JSON for consistent API responses
});

module.exports = server;
