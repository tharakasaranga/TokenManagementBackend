const express = require("express");
const cors = require("cors");
const tokenRoutes = require("./routes/tokenRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
const app = express();

// CORS Settings
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/tokens", tokenRoutes);
app.use(errorHandler);

module.exports = app;
