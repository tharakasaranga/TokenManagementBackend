const express = require("express");
const cors = require("cors");
const tokenRoutes = require("./routes/tokenRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
const app = express();

// --- Allowed Origins (මෙතන ඔයාගේ Frontend ලින්ක්ස් දාන්න) ---
const allowedOrigins = [
  "http://localhost:3000",
  "https://token-management-4n87002m5-tharakasarangas-projects.vercel.app",
  "https://token-management-frontend.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Mobile apps හෝ Postman වගේ තැන් වලින් එන requests වලට origin එකක් නෑ. ඒවා allow කරන්න.
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        // ලිස්ට් එකේ නැති කෙනෙක් නම් block කරන්න
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Cookies හෝ Headers එවන්න allow කරනවා
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Home Route
app.get("/", (req, res) => {
  res.send("API is Running Successfully!");
});

app.use("/api/tokens", tokenRoutes);
app.use(errorHandler);

module.exports = app;
