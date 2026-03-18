var express = require("express");
var dotenv = require("dotenv");
var connectDB = require("./config/db");

dotenv.config();
connectDB();

var app = express();
app.use(express.json());

// Only one routes file needed
var authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

app.get("/", function (req, res) {
  res.json({ message: "Auth API is running!" });
});

var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("Server running on port " + PORT);
});
