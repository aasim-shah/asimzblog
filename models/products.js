const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name : String,
    price : Number,
    image : String,
    
})

const Products = new mongoose.model('Product' , productSchema)

module.exports = Products;