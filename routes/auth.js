const express = require('express');
const router = express.Router();
const { login, register } = require('../components/User');
const { checkAuth } = require('../utils/jwt');
const { validateRegisterInputs, validateLoginInputs  } = require('../utils/validateInputs');

router.post('/signin', async (req, res) => {
  let userData = req.body;
  try {
    validateLoginInputs(userData);
    const token = await login(userData);
    res.json({ token })
  } catch(err) {
    res.status(422).json({ message: err.message })
  }
})

router.post('/signup', async (req, res) => {
  let userData = req.body;
  try {
    validateRegisterInputs(userData)
    const token = await register(userData);
    res.status(201).json({ token })
  } catch(err) {
    res.status(422).json({ message: err.message })
  }
})


module.exports = router