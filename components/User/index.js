const User = require('./schema');
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
  }
}