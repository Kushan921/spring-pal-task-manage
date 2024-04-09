const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ContentSchema = new Schema({
    date : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    }
   
})

module.exports = mongoose.model("content",ContentSchema)