const express = require("express");
const cors = require("cors");
const tokenRoutes = require("./routes/tokenRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
const app = express();

app.use(
  cors({
    origin: [
      "https://token-management-eight.vercel.app",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/tokens", tokenRoutes);

app.use(errorHandler);

module.exports = app;
