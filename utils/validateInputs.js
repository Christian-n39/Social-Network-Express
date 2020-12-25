module.exports = { 
  validateRegisterInputs: (userData) => {
    const { name, email, password, confirmPassword } = userData;
    if(!name, !email, !password) throw Error('Fields must not be empty');
    if(password !== confirmPassword) throw Error('Password and confirm password must match');
    if(!email.includes('@') || !email.includes('.')) throw Error('Email is not a valid email');
  },
  validateLoginInputs: (userData) => {
    const { email, password } = userData;
    if(!email, !password) throw Error('Fields must not be empty');
  },
  validatePostInputs: (postData) => {
    const { title, body, url } = postData;
    if(!title, !body, !url) throw Error('Fields must not be empty')
  }
}