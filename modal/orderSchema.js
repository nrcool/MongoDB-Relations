const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderSchema= new Schema({
    products:[{type:Schema.Types.ObjectId, ref:"products"}], 
    total :{type:Number}, 
    userId: {type:Schema.Types.ObjectId, ref: "users"}
    
})

module.exports = mongoose.model("orders", orderSchema)