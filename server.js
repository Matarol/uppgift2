//Sätter upp en Express-server som hanterar todo-lista API:et och serverar frontend-filerna.
//Importera nödvändiga moduler och filer
const express = require('express');
//Kör koden i filen db.js (som i sin tur ansluter till MongoDB databasen)
require("./db");
//Konstant som gör todo-rutterna tillgängliga från filen routes/todoRoutes.js
const todoRoutes = require('./routes/todoRoutes');

//Initiera Express-applikationen och ange portnummer
const app = express();
const PORT = process.env.PORT || 3000;

//Middleware som gör att Express kan parsa JSON i request body
app.use(express.json());

//Middleware för att minska risken för NoSQL-injektioner genom att sanera inkommande data
app.use((req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    for (const key in req.body) {
      if (key.startsWith('$') || key.includes('.')) {
        delete req.body[key];
      }
    }
  }
  next();
});

//Använd statiska filer från 'public' mappen
app.use(express.static('public'));

//Använd todo-rutterna för alla förfrågningar till /todos ändpunkten
app.use('/todos', todoRoutes);

//Startar servern som börjar bevaka/lyssna efter förfrågningar på angiven port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);//Loggar ett meddelande i konsolen när servern startar
});
