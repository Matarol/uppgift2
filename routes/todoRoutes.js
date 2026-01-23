const express = require('express');
const router = express.Router();

const {
    getTodos,
    addTodo,
    toggleTodo,
    deleteTodo
} = require('../todoStore');

// Api endpoint för att hämta alla todo's
router.get('/', (req, res) => {
    res.json(getTodos());
});

router.post('/', async (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).send('Task is required');
    }
               
    const newTodo = await addTodo(task);
    res.status(201).json(newTodo);    
});

router.patch('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const todo = await toggleTodo(id);

    if (!todo) {
        return res.status(404).send('Todo not found')
    }

    res.json(todo);
});

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    const success = await deleteTodo(id);

    if (!success) {
        return res.status(404).send('Todo not found.')
    }

    res.status(200).send(`Deleted todo with Id ${id}`);

});

module.exports = router;