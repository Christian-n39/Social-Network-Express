const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    default: "no photo"
  },
  user: {
    type: ObjectId,
    ref: 'users'
  }
});

module.exports = model('posts', postSchema);