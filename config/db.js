var mongoose = require("mongoose");

function connectDB() {
  mongoose.connect(process.env.MONGO_URI)
    .then(function () {
      console.log("MongoDB connected!");
    })
    .catch(function (err) {
      console.log("MongoDB error:", err.message);
      process.exit(1);
    });
}

module.exports = connectDB;