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
        res.redirect(`/categoryDetail/${req.params.id}`)
    })
}]

// Delete item 
exports.itemDelete_delete = (req, res)=>{
    Items.findByIdAndDelete(req.body.id)
    .then(result=>{
        return res.json({redirect:`/categoryDetail/${req.params.id}`})
    })
    .catch(err=>{
        res.send(err);
    })
} 

// UPDATE GET 
exports.itemUpdate_get = (req, res)=>{
    Items.findById(req.params.id)
    .populate('category')
    .exec(function(err, data){
        res.render('item_form', {itemData: data});
    })
}

// UPDATE POST 
exports.itemUpdate_post = [
    body('itemName', 'Field can not be empty').trim().isLength({min:1}).escape(),
    body('price','Field can not be empty').trim().isLength({min:1}).escape(),

    (req, res, next)=>{
        const errors = validationResult(req)

        const item = new Items({
            itemName : req.body.itemName,
            price: req.body.price,
            category: req.params.cid,
            _id: req.params.id
        })

        if(!errors.isEmpty()){
            res.render("item_form", {itemData:item})
            console.log(errors);
        }else{
            Items.findByIdAndUpdate(req.params.id, item, {}, function(err){
                res.redirect(`/categoryDetail/${req.params.cid}`);
            })
        }

    }
]