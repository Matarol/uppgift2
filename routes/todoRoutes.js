//Hantera alla todo-relaterade rutter för API:et
//Importera nödvändiga moduler
const express = require('express');
//Initierar en express router
const router = express.Router();
//Importera valideringsfunktioner från express-validator samt Todo modellen
const { body, param, validationResult } = require('express-validator');
const Todo = require('../models/Todo');

//Hämta (GET) alla todo's
router.get('/', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

//Skapa (POST) ny todo
router.post('/',
    //Lokal middleware för att validera request bodyn
    body('task')
        .isString().withMessage("Task must be a string.")
        .trim()
        .isLength({ min: 1, max: 200 }).withMessage("Task must be 1-200 characters."),
    //Rutthanterare som skapar en ny todo baserat på request bodyn  
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //Destrukturera task från request bodyn, alltså "plocka ut" task värdet och skapa en variabel med samma namn.
        //Det hade varit samma sak att skriva: const task = req.body.task; men med destrukturering blir det mer kompakt/mindre kod.
        const { task } = req.body;
        //Skapa en ny todo i databasen med det task värde som skickades in i request bodyn och spara den i variabeln newTodo             
        const newTodo = await Todo.create({ task });
        //Skicka tillbaka den nyskapade todo:n i response med statuskod 201 (Created)
        res.status(201).json(newTodo);    
    }
);

//Toggla (PATCH) klar
router.patch('/:id',
    //Lokal middleware för att validera id-parametern
    param('id').isMongoId().withMessage("Invalid todo id."),
    //Rutthanterare som togglar "completed" statusen för en todo baserat på id-parametern
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

    const id = req.params.id;

    const todo = await Todo.findById(id);

    if (!todo) {
        return res.status(404).send('Todo not found');
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.json(todo);
});

router.put('/:id',
    param('id').isMongoId().withMessage("Invalid todo id."),
    body('task')
        .isString().withMessage("Task must be a string.")
        .trim()
        .isLength({ min: 1, max: 200 }).withMessage("Task must be 1-200 characters."),
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = req.params.id;
        const { task } = req.body;
      
        const todo = await Todo.findByIdAndUpdate(id, { task }, { new: true });

        if (!todo) {
            return res.status(404).send('Todo not found');
        }

        res.json(todo);
    }
);

    
router.delete('/:id',
    param('id').isMongoId().withMessage("Invalid todo id."),
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
    const id = req.params.id;

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
        return res.status(404).send('Todo not found.')
    }

    res.status(200).send(`Deleted todo with Id ${id}`);

});
//Gör router-objektet tillgängligt för import i andra filer, i det här fallet i server.js där det används som middleware för /todos ändpunkten
module.exports = router;