const express = require("express");
const routes = require("./routes/index.js");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const morgan = require("morgan");
const mercadopago = require("mercadopago");
require("dotenv").config();

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN_MERCADOPAGO,
});
console.log(process.env.ACCESS_TOKEN_MERCADOPAGO)
require("./db.js");

const server = express();

server.name = "API";

// **CORS Configuration**
const allowedOrigins = [
  "http://localhost:3000", // Local development
  "http://localhost:3001", // Another local environment
  "http://localhost:5173", // Local development with Vite
  "https://localhost", // Local environment, generic
  "https://storecomputer.netlify.app", // Netlify deployment
  "https://elgatonegropremium.netlify.app", // Netlify deployment for El Gato Negro
  "https://railway.app", // Railway platform
  "https://netlify.app", // Netlify platform
  "https://back-production-148d.up.railway.app", // Railway backend production
  "https://back-production-148d.up.railway.app/users", // Specific route in Railway backend
  "https://back-production-148d.up.railway.app/cart", // Specific route in Railway backend
  "https://back-production-148d.up.railway.app/products/types", // Specific route in Railway backend
  "https://back-production-148d.up.railway.app/products", // Specific route in Railway backend
  "https://www.mercadolibre.com", // Mercado Libre
  "https://elgatonegropremium-back-production.up.railway.app/users/auth/google", // Google Auth callback (El Gato Negro)
  "https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount", // Google OAuth
  "https://accounts.google.com", // Google OAuth service
  "https://sdk.mercadopago.com", // MercadoPago SDK
  "https://cdn.jsdelivr.net", // JSDelivr CDN
  "https://opencollective.com", // Open Collective
  "https://github.com", // GitHub
  "https://eslint.org", // ESLint website
  "https://vitejs.dev", // Vite official site
  "https://www.instagram.com", // Instagram
  "https://www.facebook.com", // Facebook
  "https://web.whatsapp.com", // WhatsApp Web
  "https://cdn-icons-png.flaticon.com", // Flaticon icon CDN
  "https://wa.me", // WhatsApp API
  "https://login.live.com", // Microsoft login
  "https://elgatonegropremium-back-production.up.railway.app", // El Gato Negro backend (API)
  "https://res.cloudinary.com", // Cloudinary image hosting
  "https://api.mercadopago.com", // MercadoPago API
  "https://www.google.com", // Google search
];

// Configuración de CORS con una función personalizada para verificar el origen
server.use(
  cors({
    origin: (origin, callback) => {
      // Permite solicitudes sin origen (por ejemplo, desde Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS no permitido desde este origen"), false);
      }
    },
    credentials: true,
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
  })
);

// **File Upload Setup**
server.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  })
);

// **Morgan Logging Setup**
server.use(morgan("dev")); // Puedes usar otro formato de log si prefieres

// **JSON Body Parsing**
server.use(express.json());

// **Routes**
server.use("/", routes);

// **URL-encoded Form Parsing**
server.use(express.urlencoded({ extended: false }));

// **Enhanced Error Handling**
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;

  // Log the error for debugging
  console.error(err);

  res.status(status).json({ message });
});

module.exports = server;
