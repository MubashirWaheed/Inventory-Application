var express = require('express');
var router = express.Router();
const home_controller = require('../controllers/homeController');
const categories_controller = require('../controllers/categoriesController');
const itemsController = require('../controllers/itemsController')

// GET route for the Home page 
router.get('/', home_controller.home);

// GET route for the Category list page
router.get('/categories', categories_controller.categories);

// GET route for details of category 
router.get('/categoryDetail/:id',categories_controller.categories_detail);

// GET route for the Category form page
router.get('/form', categories_controller.categories_create_get)

// POST route for the Category form page
router.post('/form', categories_controller.categories_create_post)


// GET route for the item form
router.get('/categories/:id/itemCreate', itemsController.itemCreate_get) ;

// POST route for item form
router.post('/categories/:id/itemCreate', itemsController.itemCreate_post);

// DELETE route for items
router.delete('/categoryDetail/:id',itemsController.itemDelete_delete);

// UPDATE get route 
router.get('/categories/:cid/update/:id', itemsController.itemUpdate_get);

// UPDATE Post route 
router.post('/categories/:cid/update/:id', itemsController.itemUpdate_post);

module.exports = router;
