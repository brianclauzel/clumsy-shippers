const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema
const RequestSchema = new Schema({
  name: {
    type: String
  },
  type: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  private: {
    type: Boolean
  },
  votes: {
    type: Number
  },
  comments: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Requests = mongoose.model("requests", RequestSchema);
