var express = require('express');
var router = express.Router();

const home_controller = require('../controllers/homeController');
const categories_controller = require('../controllers/categoriesController');

router.get('/', home_controller.home);
router.get('/categories', categories_controller.categories);

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('home', { title: 'Express' });
// });

module.exports = router;
