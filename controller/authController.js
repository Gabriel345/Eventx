const User = require('../models/user');
const createError = require('http-errors');


exports.login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
  
      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }
  
      req.session.userId = user._id;
      res.status(200).json({ message: 'Login bem-sucedido' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

  };