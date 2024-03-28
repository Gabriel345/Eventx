const User = require('../models/user');
const createError = require('http-errors');

// Função para criar um novo usuário
exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    // Redirecione o usuário para a página inicial após o registro
    res.redirect('/');
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.username) {
      // Nome de usuário duplicado
      return res.status(400).send({ message: 'Nome de usuário já em uso' });
    } else if (error.code === 11000 && error.keyPattern.email) {
      // E-mail duplicado
      return res.status(400).send({ message: 'Endereço de e-mail já em uso' });
    } else {
      // Outro erro
      return res.status(500).send({ message: error.message });
    }
  }
};

// Função para buscar todos os usuários
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Função para buscar um usuário pelo ID
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

// Função para atualizar informações de um usuário existente
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

// Função para excluir um usuário
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