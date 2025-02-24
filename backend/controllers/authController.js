const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Регистрация пользователя
exports.register = async (req, res) => {
    try {
        console.log('🔹 Регистрация началась, полученные данные:', req.body);
        
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Имя, Email и пароль обязательны' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Пароль должен содержать минимум 6 символов' });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Пользователь с таким email или username уже существует' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        
        res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
    } catch (error) {
        console.error('❌ Ошибка регистрации:', error);
        res.status(500).json({ message: 'Ошибка при регистрации пользователя', error: error.message });
    }
};

// Логин пользователя
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email и пароль обязательны' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден.', needsRegistration: true });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Неверный пароль' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('❌ Ошибка при входе:', error);
        res.status(500).json({ message: 'Ошибка при входе в систему', error: error.message });
    }
};

// Получение профиля пользователя
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        res.json(user);
    } catch (error) {
        console.error('❌ Ошибка при получении профиля:', error);
        res.status(500).json({ error: error.message });
    }
};

// Обновление профиля пользователя
exports.updateProfile = async (req, res) => {
    try {
        const { username, email } = req.body;

        if (!username && !email) {
            return res.status(400).json({ message: 'Необходимо указать новое имя или email' });
        }

        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        if (username) user.username = username;
        if (email) user.email = email;

        await user.save();
        res.json({ message: 'Профиль успешно обновлён', user });
    } catch (error) {
        console.error('❌ Ошибка при обновлении профиля:', error);
        res.status(500).json({ message: 'Ошибка при обновлении профиля', error: error.message });
    }
};
