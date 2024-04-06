const User = require('../models/user');
const bcrypt = require('bcrypt');
const createError = require('http-errors');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        // Verificar se o usuário existe
        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Comparar a senha fornecida com o hash da senha armazenada no banco de dados
        const passwordMatch = await bcrypt.compare(password, user.passwordHash);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Se a senha corresponder, definir o ID do usuário na sessão
        req.session.userId = user._id;
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
