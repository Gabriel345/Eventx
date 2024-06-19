const express = require('express');
const router = express.Router();
const EventController = require('../controller/eventController');

// Rota para exibir todos os eventos
router.get('/', EventController.getAllEvents);

// Rota para exibir o formulário de criação de evento
router.get('/create', (req, res, next) => {
  res.render('create-event'); // Renderiza o formulário de criação de evento
});

// Rota para lidar com o processo de criação de um novo evento
router.post('/create', EventController.createEvent);

// Rota para exibir os detalhes de um evento específico
router.get('/:id', EventController.getEventDetails);

// Rota para permitir que um usuário se registre para um evento
router.post('/:eventId/register', EventController.registerForEvent);

// Rota para renderizar a página de edição de evento
router.get('/:id/edit', EventController.renderEditEventPage);

// Rota para manipular a edição de evento
router.post('/:id/edit', EventController.editEvent);

// Rota para excluir um evento
router.post('/:id/delete', EventController.deleteEvent);

router.post('/:eventId/unregister', EventController.unregisterFromEvent);

module.exports = router;
