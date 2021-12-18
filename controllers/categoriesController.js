const Categories = require('../models/categories');
const {body, validationResult } = require('express-validator');

const path = require('path')
const crypto = require('crypto');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');

// Multer for storing uploaded files
const URI = process.env.MONGODB;

// Diplays Category page
exports.categories = (req, res)=>{
    res.render('categories');
} 
// Displays Create category form
exports.categories_create_get = (req, res)=>{
    res.render('form');
}
// Date is sent to server on form submission 
exports.categories_create_post = [
    // Data sanitization
    body('name').trim().isLength({min:1}).escape().withMessage('Name must be specified.'),
    
    // Error handling 
    (req, res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.render('form');
            return;
        }else{
            console.log(req.body);
            const category = new Categories({
                name:req.body.categoryName,
                description:req.body.categoryDescription
            });
            category.save(function(err){
                if (err) return  next(err)
                res.redirect('/');
            })
        }
    }

]