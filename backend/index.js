const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const socketIo = require("socket.io");

// Create Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Setup Socket.IO
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
app.set("io", io);

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Route imports
const userRoutes = require("./src/routes/UserRoutes");
const areaRoutes = require("./src/routes/AreaRoutes");
const cityRoutes = require("./src/routes/CityRoutes");
const stateRoutes = require("./src/routes/StateRoute");
const featureRoutes = require("./src/routes/FeatureRoutes");
const inquiryRoutes = require("./src/routes/InquiryRoutes");
const insuranceRoutes = require("./src/routes/InsuranceRoutes");
const carRoutes = require("./src/routes/CarRoutes");
const reviewRoutes = require("./src/routes/ReviewRoutes");
const otpRoutes = require("./src/routes/OtpRoutes");
const wishlistRoutes = require("./src/routes/WishlistRoutes");
const notificationRoutes = require("./src/routes/NotificationRoutes");
const adminRoutes = require("./src/routes/AdminRoutes");
const testDriveRoutes = require("./src/routes/TestDriveRoutes");

// Route handlers with /api prefix
app.use("/api/user", userRoutes);
app.use("/api/area", areaRoutes);
app.use("/api/city", cityRoutes);
app.use("/api/state", stateRoutes);
app.use("/api/feature", featureRoutes);
app.use("/api/inquiry", inquiryRoutes);
app.use("/api/insurance", insuranceRoutes);
app.use("/api/car", carRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/test-drives", testDriveRoutes);

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/vehicle_vault")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: true, message: "Something went wrong!" });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
