const express = require('express');
const router = express.Router();

const { validatePostInputs } = require('../utils/validateInputs');
const { checkAuth } = require('../utils/jwt');
const { createPost, getAllPosts, getPost, getMyPosts, likePost, commentPost } = require('../components/Post');


router.get('/posts', async (req, res) => {
  await checkAuth(req, res)
  const posts = await getAllPosts();
  await res.json(posts)
});

router.get('/posts/:id', async (req, res) => {
  try {
    const user = await checkAuth(req, res);
    const postId = req.params.id;
    const post = await getPost(postId);
    res.json(post)
  } catch (err) {
    res.json(err.message)
  }
})

router.get('/myposts', async (req, res) => {
  try {
    const user = await checkAuth(req, res);
    const myPosts = await getMyPosts(user);
    res.json(myPosts)
  } catch (err) {
    res.json(err.message)
  }
})



router.post('/createPost', async (req, res) => {
  const postData = req.body;
  const user = await checkAuth(req, res)
  try {
    validatePostInputs(postData);
    const post = await createPost(postData, user);
    await res.json({ message: 'Post created successfully' })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
});

router.put('/like', async (req, res) => {
  const user = await checkAuth(req, res)
  const postId = req.body.postId
  try {
    const liked = await likePost(user, postId)
    res.json(liked)
  } catch (err) {
    res.status(422).send(err.message)
  }
});

router.put('/comment', async (req, res) => {
  const user = await checkAuth(req, res);
  const { postId, body } = req.body;
  try {
    if(!body) throw Error('Comment must not be empty')
    const commentedPost = await commentPost(user, postId, body);
    res.json(commentedPost)
  } catch (err) {
    res.json(err.message)
  }
})

module.exports = router;
