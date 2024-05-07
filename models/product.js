const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
 {
  name:{
    type:String,
    required:true
  },
  stock:{
    type:Number,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  category:{
    type:mongoose.ObjectId,
    ref: "Category",
    required:true
  },
  discountPercentage: {
    type: Number,
    min: 0,
    max: 99.99,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  images:[
    {
      public_id:{
        type:String,
        required:true
      },
      url:{
        type:String,
        required:true
      }
    }
  ]
  
 },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
