const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/gr8-todo-app-db");

mongoose.connection.on("connected", () => {
    console.log("✅ MongoDB connected");
});

mongoose.connection.on("error", (err) => {
    console.log("❌ MongoDB connection error:", err);
});

module.exports = mongoose;