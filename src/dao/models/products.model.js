import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const productsSchema= mongoose.Schema({
  title: {type:String, required:true, max:25},
  description: {type:String, required:true, max:150},
  code: {type:Number, required:true},
  price: {type:Number, required:true},
  stock: {type:Number, required:true, max:50},
  category: {type:String, required:true, max:50},
  thumbnail: {type:Array},
  status: {type:Boolean, default:true}
},{timestamps:true})

// Mongoose Pagination
productsSchema.plugin(mongoosePaginate)

export default productsSchema