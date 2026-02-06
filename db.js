//Konstant för mongoose biblioteket
const mongoose = require('mongoose');

//Anslut till MongoDB databasen med angiven URL
mongoose.connect("mongodb://localhost:27017/gr8-todo-app-db");

//Gör databasen tillgänglig ifall anslutningen gick bra samt loggar anslutningsstatus
mongoose.connection.on("connected", () => {
    console.log("✅ MongoDB connected");
});

//Felhantering vid anslutningsfel
mongoose.connection.on("error", (err) => {
    console.log("❌ MongoDB connection error:", err);
});

//Exportera mongoose för användning i andra filer
module.exports = mongoose;