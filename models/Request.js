const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema
const RequestSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
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
    type: Number,
    default: 0
  },
  read: {
    type: Boolean,
    default: false
  },
  comment: {
    type: String,
    default: "No Comment"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Requests = mongoose.model("requests", RequestSchema);
