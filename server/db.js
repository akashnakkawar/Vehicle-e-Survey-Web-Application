const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://siri:1234@cluster0.womka.mongodb.net/sc827?retryWrites=true&w=majority')
        .catch(e=>console.log('connection error',e.message))

const db=mongoose.connection

module.exports = db