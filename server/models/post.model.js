const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: Buffer,
    required: true,
  },
});

module.exports = mongoose.model('Post', PostSchema);
