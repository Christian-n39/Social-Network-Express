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
  profilePic: {
    type: String,
    default: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
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