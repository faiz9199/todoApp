const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema for todo
const todoSchema = new Schema({
  text: {
    type: String,
    required: [true, "The todo text field is required"],
  },
});

//create model for todo
const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
