const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        required : true ,
        ref : "User"
    },
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "Product"
    },
    content : {
        type : String,
        required : true,
    },
    
});
modules.exports = reviewSchema;
