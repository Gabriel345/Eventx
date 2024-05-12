const express = require('express');
const router = express.Router();
const EventController = require('../controller/eventController');

// Rota para exibir todos os eventos
router.get('/', (req, res, next) => {
  res.render('<h1>eventos</h1>');
});

// Rota para exibir o formulário de criação de evento
router.get('/create', (req, res, next) => {
  res.render('create-event');
});

// Rota para lidar com o processo de criação de um novo evento
router.post('/create', EventController.createEvent);

// Rota para exibir os detalhes de um evento específico
router.get('/:id', EventController.getEventDetails);

// Rota para permitir que um usuário se registre para um evento
router.post('/:eventId/register', EventController.registerForEvent);

module.exports = router;
