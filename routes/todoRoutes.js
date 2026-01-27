const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');
const Todo = require('../models/Todo');

//Hämta (GET) alla todo's
router.get('/', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

//Skapa (POST) ny todo
router.post('/',
    body('task')
        .isString().withMessage("Task must be a string.")
        .trim()
        .isLength({ min: 1, max: 200 }).withMessage("Task must be 1-200 characters."),    
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { task } = req.body;
        if (!task) {
            return res.status(400).send('Task is required');
        }
               
    const newTodo = await Todo.create({ task });
    res.status(201).json(newTodo);    
});

//Toggla (PATCH) klar
router.patch('/:id',
    param('id').isMongoId().withMessage("Invalid todo id."),
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

module.exports = router;