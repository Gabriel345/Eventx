const User = require('../models/user');
const createError = require('http-errors');


exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
   
    res.redirect('/');
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.username) {
      
      return res.status(400).send({ message: 'Nome de usuário já em uso' });
    } else if (error.code === 11000 && error.keyPattern.email) {
      
      return res.status(400).send({ message: 'Endereço de e-mail já em uso' });
    } else {
      
      return res.status(500).send({ message: error.message });
    }
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};