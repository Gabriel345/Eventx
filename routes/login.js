var express = require('express');
var router = express.Router();
const authController = require('../controller/authController');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', authController.login);

module.exports = router;
