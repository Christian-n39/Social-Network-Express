const express = require('express');
const { checkAuth } = require('../utils/jwt');
const { getProfile, follow } = require('../components/User');

const router = express.Router();

router.post('/getprofile', async (req, res) => {
  const userReq = await checkAuth(req, res);
  const userId = req.body.userId;
  console.log(req.body)
  try {
    const profile = await getProfile(userId)
    res.json(profile)
  } catch (err) {
    res.json(err.message)
    console.log(err.message)
  }
})

router.put('/follow', async (req, res) => {
  const user = await checkAuth(req, res);
  const userId = req.body.userId;
  try {
    const updatedList = await follow(user, userId)
    res.json(updatedList)
  } catch (err) {
    res.json(err.message)
  }
})

module.exports = router;