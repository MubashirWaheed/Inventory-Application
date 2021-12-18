const mongoose = require('mongoose');
const   Schema  = mongoose.Schema;

let CategoriesSchema = new Schema(
    {
        name : {type:String, required:true},
        description: {type:String, required:true},   
    }
)
module.exports = mongoose.model('Category', CategoriesSchema)