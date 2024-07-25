const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    task: {type: String, required: true},
    date: {type: String, required: true},
    description: {type: String, required: true},
    options: {type: String, required: true}
})

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;