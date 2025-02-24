const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Извлечение токена с Bearer

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Проверка токена
        req.user = decoded; // Добавление данных пользователя в запрос
        next(); // Переход к следующему middleware или маршруту
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
