import mongoose from "mongoose";

const cartsModel=mongoose.Schema({
  products:[{
    product:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'products'
    },
    quantity:{type:Number, required:true}
  }]
},{timestamps:true})

export default cartsModel