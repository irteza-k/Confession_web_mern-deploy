const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const ConfessionSchema = new mongoose.Schema({
  confessionText: { type: String, required: true },
  postedBy: { type: String, required: true }, // could be the anonymous ID or username
  datePosted: { type: Date, default: Date.now },
  reactions: {
    type: Map,
    of: Number,
    default: {}
  },
  comments: [CommentSchema]
});

module.exports = mongoose.model('Confession', ConfessionSchema);
