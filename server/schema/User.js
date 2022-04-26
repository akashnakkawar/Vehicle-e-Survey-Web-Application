const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
       
        email:{type:String,required:true},
        name:{type:String,required:true},
        dob:{type:String,required:true},
        address:{type:String,required:true},
        password:{type:String,required:true},
        sni:{type:String,required:true},
        questions:{type:[String],required:false}
        
    },
    {   timestamps: true},
)

module.exports = mongoose.model('user',User)