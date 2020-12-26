const User = require('./schema');
const Post = require('../Post/schema');
const bcrypt = require('bcryptjs');
const { signToken } = require('../../utils/jwt');

module.exports = {
  login: async ({ email, password }) => {
    const user = await User.findOne({ email });
    if(!user) throw Error('User doesn\'t exists');
    
    const match = await bcrypt.compare(password, user.password);
    if(!match) throw Error('Wrong credentials');
    
    const token = signToken({
      name: user.name, email: user.email, id: user._id
    });

    return token;
  },
  register: async ({ name, email, password }) => {
    const existingUser = await User.findOne({ email });
    if(existingUser) throw new Error('User already exists');

    password = await bcrypt.hash(password, 7);
    const newUser = new User({
      name, email, password
    });
    const user = await newUser.save()
    const token = signToken({
      name: user.name, email: user.email, id: user._id
    });
    return token;
  },
  getProfile: async (userId) => {
    const user = await User.findById(userId);
    const posts = await Post.find({ user: user._id });
    const profile = {
      user: {
        _id: user._id,
        name: user.name
      },
      posts
    };
    return profile;
  },
  follow: async (user, userIdToFollow) => {
    // Get user to follow and my lists of follows
    const userToFollow = await User.findById(userIdToFollow)
    const me = await User.findById(user._id)
    // if(I´m already following you) {
    //  delete me from your list you.followers
    //  delete you from my list me.following
    // } else { add me to your list and I add you to my following list }
    if(userToFollow.followers.find(follower => follower.username == me.name)) {
      userToFollow.followers = userToFollow.followers.filter(follower => follower.username !== me.name)
      me.following = me.following.filter(following => following.username !== userToFollow.name)
    } else {
      userToFollow.followers.push({ username: me.name })
      me.following.push({ username: userToFollow.name })
    }
    // Save changes
    await userToFollow.save()
    await me.save()
    // Return updated list
    return {
      following: me.following,
      followers: me.followers
    }
  }
}