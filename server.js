const express = require('express');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(bodyParser.json());

//Set up routes
app.use(todoRoutes);

//Use express for FE
app.use(express.static('public'));

// A basic route
app.get('/', (req, res) => {
  res.send('Hey, there!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
