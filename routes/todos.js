const { Router } = require('express')
const mamTodo = require('../models/Todo.js')
const mamRouter = Router()

mamRouter.get('/', async (req,res) => {
   const mamTodos = await mamTodo.find({}).lean()
   
    res.render('index', {
        title: 'Todos list',
        isIndex: true,
        mamTodos
    })
})

mamRouter.get('/create', (req,res) => {
    res.render('create', {
        title: 'Create Todo',
        isCreate: true
    })
})

mamRouter.post('/create', async (req,res) => {
    const todo = new mamTodo({
        title: req.body.title
    })

    await todo.save()
    res.redirect('/')
})

mamRouter.post('/complete', async (req,res) => {
    const todo = await mamTodo.findById(req.body.id)

    todo.completed = !!req.body.completed
    await todo.save()
    res.redirect('/')
})

module.exports = mamRouter
