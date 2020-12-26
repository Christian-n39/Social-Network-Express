const { Schema, model } = require('mongoose');
const { ObjectId } = require('mongoose').Types;

const userSchema = new Schema ({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  followers: [
    {
      username: String
    }
  ],
  following: [
    {
      username: String
    }
  ]
})

module.exports = model('users', userSchema);