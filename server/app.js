require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors"); // Importing CORS
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();

// Middleware for parsing cookies and URL-encoded data
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));

// CORS Configuration
const allowedOrigins = [process.env.CLIENT_URL]; // Ensure this is set in your .env file as CLIENT_URL=http://localhost:3000 (or your frontend URL)
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies to be sent with requests
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Loading Routes
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const superAdminRoutes = require("./routes/superAdmin");
const publicRoutes = require("./routes/public");
const authRoutes = require("./routes/auth");

// Authentication middleware
const { requireAuth, requireAdminAuth } = require("./middleware/requireAuth");

// Mounting routes
app.use("/api/auth", authRoutes);
app.use("/api/user", requireAuth, userRoutes);
app.use("/api/admin", requireAdminAuth, adminRoutes);
app.use("/api/super-admin", requireAdminAuth, superAdminRoutes);
app.use("/api/public", publicRoutes);

// Static file serving for images
app.use("/api/img", express.static(__dirname + "/public/products/"));
app.use("/api/off", express.static(__dirname + "/public/official/"));

// Database connection and server start
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on Port: ${process.env.PORT} - DB Connected`);
    });
  })
  .catch((error) => {
    console.log("Database connection error:", error);
  });
