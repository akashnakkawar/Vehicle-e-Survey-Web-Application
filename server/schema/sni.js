const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Sni = new Schema(
    {
        sni:{type:String,required:false},
        
    },
    {   timestamps: true},
)

module.exports = mongoose.model('sni',Sni)