const Items = require('../models/items');
const Categories = require('../models/categories');
const {body, validationResult } = require('express-validator');

exports.itemCreate_get = (req, res)=>{
    // fetching data of single category 
    Categories.findById(req.params.id)
    .exec(function(err,category){
        res.render('item_form', {category:category});
    })
}
exports.itemCreate_post = [
    body('itemName').trim().isLength({min:1}).escape().withMessage('Name must be specified.'),
    (req, res, next)=>{
    console.log(req.params.id);
    
    const item = new Items({
        itemName:req.body.itemName,
        category:req.params.id,
        price:req.body.price
    })
    item.save(function(err){
        if(err) return next(err)
        res.redirect('/categories');
    })
}]