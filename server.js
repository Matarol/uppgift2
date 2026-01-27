const express = require('express');
require("./db");
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json());

//Blocking of Mongo db operators in request body
app.use((req, res, next) => {

  if(!req.body || Object.keys(req.body).length === 0) {
    return next();
  }
  const bodyString = JSON.stringify(req.body);
  if (bodyString.includes("$") || bodyString.includes(".")) {
    return res.status(400).json({ error: "invalid input" });
  }

  next();

});

//Use express for FE
app.use(express.static('public'));

//Set up routes
app.use('/todos', todoRoutes);

// Starta server efter att todos har laddats från fil
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
