require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db'); // Подключение к базе данных
const authRoutes = require('./routes/authRoutes'); // Маршруты для аутентификации
const taskRoutes = require('./routes/taskRoutes'); // Маршруты для задач

// Подключаемся к базе данных
connectDB();

const app = express();

// Middleware для обработки JSON
app.use(express.json());
app.use(cors());

// Подключаем маршруты API
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Раздача статических файлов (фронтенд)
app.use(express.static(path.join(__dirname, 'public')));

// Устанавливаем маршруты для страниц, без расширения .html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));  // Главная страница - вход
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));  // Страница регистрации
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'profile.html'));  // Страница профиля
});

app.get('/tasks', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'tasks.html'));  // Страница задач
});

// Запускаем сервер
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
