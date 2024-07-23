const mongoose = require('mongoose');

const productSchema= mongoose.Schema({
    name:{type:String},
    Description:{type:String, required:false},
    category:{type:String, required:false},
    price:{type:Number},
    Quantity:{type:Number}
})

const Product = mongoose.model("Product",productSchema);
module.exports = Product;

// {
//     name:"Mobile",
//     Description:"This is a VivoMobile",
//     category:Electronics,
//     price:10000,
//     Quantity:200
// }