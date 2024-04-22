var express = require('express');
var router = express.Router();
var EventController = require('../controller/eventController');


router.get('/', function(req, res, next) {
  
  res.render('<h1>eventos</h1>');
});
router.get('/create', function(req, res, next) {
  
  res.render('create-event');
});


router.post('/create', EventController.createEvent);

router.get('/:id', EventController.getEventDetails);



module.exports = router;