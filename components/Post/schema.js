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
    required: true
  },
  user: {
    type: ObjectId,
    ref: 'users'
  },
  createdAt: {
    type: String,
    required: true
  },
  likes: [
    {
      username: String
    }
  ],
  comments: [
    {
      body: String,
      username: String,
      createdAt: String
    }
  ]
});

module.exports = model('posts', postSchema);