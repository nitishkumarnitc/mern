const express = require('express');
const toDoController=require('./../controllers/todo.controller')

const todoRoutes = express.Router();
todoRoutes.route('/').get(toDoController.searchTodos);

todoRoutes.route('/:id').get(toDoController.getTodoById);

todoRoutes.route('/add').post(toDoController.addTodo);

todoRoutes.route('/update/:id').post(toDoController.updateTodo);

module.exports=todoRoutes;