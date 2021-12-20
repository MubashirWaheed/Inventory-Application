const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ItemsSchema = new Schema(
    {
        itemName: {type:String},
        category: {type:Schema.Types.ObjectId,ref:"Category"},
        price:{type:String}
    }
)
module.exports = mongoose.model('Items', ItemsSchema)