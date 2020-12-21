const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const User = require('../components/User/schema');

module.exports = {
  signToken: (userData) => {
    const token = jwt.sign(userData, JWT_SECRET, { expiresIn: '1h' })
    return token;
  },
  checkAuth: async (req, res) => {
    const { authorization } = req.headers;
    if(!authorization) return res.status(401).json({ message: 'You must provide an authorization header' });
    const token = authorization.split('Bearer ')[1];
    if(!token) return res.status(400).json({ message: 'Authorization header must be \'Bearer [token]\' '});
    const user = jwt.verify(token, JWT_SECRET, async (err, payload) => {
      if(err) return res.status(401).json({ message: 'Expired or invalid token' });
      const authUser = await User.findOne({ email: payload.email })      
      return authUser
    });
    return user
  }
}