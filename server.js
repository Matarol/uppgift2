const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// A basic route
app.get('/', (req, res) => {
  res.send('Hey, there!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
