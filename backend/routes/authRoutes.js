const express = require('express');
const { register, login, getProfile, updateProfile } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Регистрация
router.post('/register', register);

// Логин
router.post('/login', login);

// Получение профиля
router.get('/profile', authMiddleware, getProfile);

// Обновление профиля
router.put('/profile', authMiddleware, updateProfile);

module.exports = router;
