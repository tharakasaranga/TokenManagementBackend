const express = require("express");
const cors = require("cors");
const tokenRoutes = require("./routes/tokenRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
const app = express();

// Frontend ලින්ක්ස් (හරියටම බලල දාන්න)
const allowedOrigins = [
  "http://localhost:3000",
  "https://token-management-4n87002m5-tharakasarangas-projects.vercel.app",
  "https://token-management-frontend.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("CORS Policy Error"), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

// Preflight requests හදන්න මේකත් දාන්න
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/tokens", tokenRoutes);
app.use(errorHandler);

module.exports = app;
