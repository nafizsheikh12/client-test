const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    title:{
        type:String
    },
    image:{
        type:String 
    }
})

//]

module.exports = mongoose.model("image",userSchema)