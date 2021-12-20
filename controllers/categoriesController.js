const Categories = require('../models/categories');
const Items = require('../models/items');

const {body, validationResult } = require('express-validator');

const path = require('path')
const crypto = require('crypto');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');

// Multer for storing uploaded files
const URI = process.env.MONGODB;

// Diplays Category page
exports.categories = (req, res)=>{
    Categories.find({}, 'name description')
    .exec(function(err, categories){
        res.render('categories', {categories: categories});
    })
}
// Category detail page 
exports.categories_detail = (req, res)=>{
    Items.find({'category' : req.params.id}, 'itemName')
    .exec(function(err,items){
        res.render('category_detail' , {items: items});
    })

}
// Displays Create category form
exports.categories_create_get = (req, res)=>{
    res.render('form');
}

// Data is sent to server on form submission 
exports.categories_create_post = [
    // Data sanitization
    body('categoryName').trim().isLength({min:1}).escape().withMessage('Name must be specified.'),
    body('categoryDescription').trim().isLength({min:1}).escape().withMessage('Name must be specified.'),

    (req, res, next)=>{
        // Error handling 
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            // Pass that error to form 
            res.render('form');
            return;
        }else{
            const category = new Categories({
                name:req.body.categoryName,
                description:req.body.categoryDescription
            });
            category.save(function(err){
                if (err) return  next(err)
                res.redirect('categories');
            })
        }
    }

]