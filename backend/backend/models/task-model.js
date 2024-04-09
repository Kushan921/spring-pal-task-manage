const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TasksSchema = new Schema({
    date : {
        type : String,
        required : true
    },
    designer : {
        type : String,
        required : true
    },
    page : {
        type : String,
        required : true
    },
    task : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("tasks",TasksSchema)