var express = require('express');
var router = express.Router();
const home_controller = require('../controllers/homeController');
const categories_controller = require('../controllers/categoriesController');

// GET route for the Home page 
router.get('/', home_controller.home);

// GET route for the Category list page
router.get('/categories', categories_controller.categories);

// GET route for the Category form page
router.get('/form', categories_controller.categories_create_get)

// POST route for the Category form page
router.post('/form', categories_controller.categories_create_post)


module.exports = router;
