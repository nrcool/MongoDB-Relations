const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema= new Schema({
    first_name : {type:String},
    last_name : {type:String}, 
    email: {type:String},
    orders:[{type:Schema.Types.ObjectId, ref:"orders"}]

})


module.exports = mongoose.model("users", userSchema)