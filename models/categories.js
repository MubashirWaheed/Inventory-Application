const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

let CategoriesSchema = new Schema(
    {
        name : {type:String, required:true},
        description: {type:String, required:true}
    }
)
CategoriesSchema
.virtual('url')
.get(function(){
    return `/categories/${this._id}`
});
CategoriesSchema
    .virtual('id')
    .get(function(){
    return `${this._id}`
});

module.exports = mongoose.model('Category', CategoriesSchema)