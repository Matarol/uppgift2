const express = require('express');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json());

//Use express for FE
app.use(express.static('public'));

//Set up routes
app.use('/todos', todoRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
