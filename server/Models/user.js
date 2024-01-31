const mongoose = require("mongoose")
const Schma = mongoose.Schema

const userscham = new Schma({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    validated:{type:Boolean,default:false}
})

const User = mongoose.model('user',userscham)
module.exports = User