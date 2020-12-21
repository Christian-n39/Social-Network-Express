const express = require('express');
const router = express.Router();

const { validatePostInputs } = require('../utils/validateInputs');
const { checkAuth } = require('../utils/jwt');
const { createPost } = require('../components/Post');

router.post('/createPost', async (req, res) => {
  const postData = req.body;
  const user = await checkAuth(req, res)
  try {
    validatePostInputs(postData);
    const post = await createPost(postData, user);
    await res.json({ post })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}); 

module.exports = router;
