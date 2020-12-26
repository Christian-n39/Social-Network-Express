const Post = require('./schema');
const ObjectId = require('mongoose').Types.ObjectId


module.exports = {
  getAllPosts: async () => {
    const posts = await Post.find().populate('user', '_id name')
    return posts;
  },
  getPost: async (postId) => {
    const post = await Post.findById(postId).populate('user', '_id name')
    return post
  },
  getMyPosts: async (user) => {
    const myPosts = await Post.find({ user: user._id }).populate('user', '_id name')
    return myPosts
  },
  createPost: async ({ title, body, url, photoId }, user) => {
    const newPost = new Post({
      title,
      body,
      photoId,
      user: {
        _id: user._id
      }, 
      photo: url,
      createdAt: new Date().toISOString()
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
  },
  likePost: async (user, postId) => {
    const post = await Post.findById(postId);
    // Toggle like 
    if(post.likes.find(like => like.username == user.name)){
      post.likes = post.likes.filter(like => like.username !== user.name);
    } else {
      post.likes.push({
        username: user.name,
      })
    }
    await post.save()
    return post
  },
  commentPost: async (user, postId, body) => {
    const post = await Post.findById(postId);
    post.comments.push({
      username: user.name,
      body,
      createdAt: new Date().toISOString()
    });
    await post.save();
    return post
  },
  deletePost: async (user, postId) => {
    const postOwner = await Post.findOne({ _id: postId}).populate('user', '_id email');
    if(user.email !== postOwner.user.email) throw Error('You are not the owner');
    await postOwner.delete()
    return true
  }
}