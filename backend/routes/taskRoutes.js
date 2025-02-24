const express = require('express');
const { createTask, getTasks, getTaskById, updateTask, deleteTask } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Создание задачи
router.post('/', authMiddleware, createTask);

// Получение всех задач пользователя
router.get('/', authMiddleware, getTasks);

// Получение задачи по id
router.get('/:id', authMiddleware, getTaskById);

// Обновление задачи по id
router.put('/:id', authMiddleware, updateTask);

// Удаление задачи по id
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;
