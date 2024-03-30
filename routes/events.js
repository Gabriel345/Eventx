var express = require('express');
var router = express.Router();
var EventController = require('../controller/eventController');

// Rota para exibir o formulário de criação de eventos
router.get('/', function(req, res, next) {
  // Aqui você pode renderizar seu formulário de criação de eventos
  res.render('<h1>eventos</h1>');
});
router.get('/create', function(req, res, next) {
  // Aqui você pode renderizar seu formulário de criação de eventos
  res.render('create-event');
});

// Rota para lidar com a submissão do formulário de criação de eventos
router.post('/create', EventController.createEvent);

module.exports = router;