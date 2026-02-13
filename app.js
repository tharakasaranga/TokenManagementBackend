const express = require("express");
const cors = require("cors");
const tokenRoutes = require("./routes/tokenRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
const app = express();

const corsOptions = {
  origin: [
    "https://token-management-4n87002m5-tharakasarangas-projects.vercel.app",
    "http://localhost:3000",
    "*"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.get("/", (req, res) => {
  res.send("API is Running Successfully!");
});

app.use("/api/tokens", tokenRoutes);
app.use(errorHandler);

module.exports = app;
