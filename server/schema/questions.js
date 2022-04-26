const mongoose = require('mongoose')
const Schema = mongoose.Schema

let counter = 1;
let CountedId = {type: Number, default: () => counter++};

const Questions = new Schema(
    {
        id: CountedId,
        question:{type:String,required:true},
        options:{type:[Object],required:true},
           
    },
    {   timestamps: true},
)

module.exports = mongoose.model('questions',Questions)