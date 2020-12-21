const Post = require('./schema');

module.exports = {
  createPost: async ({ title, body }, user) => {
    const newPost = new Post({
      title, body, user: {
        _id: user._id
      }
    })
    const savedPost = await newPost.save()
    // Warn: Do not return the password of owner
    return {
      ...savedPost.toJSON(),
      user: {
        _id: user._id,
        name: user.name
      }
    };
  }
}