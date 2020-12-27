const express = require('express');
const { checkAuth } = require('../utils/jwt');
const { getProfile, follow, updateProfilePic } = require('../components/User');

const router = express.Router();

router.post('/getprofile', async (req, res) => {
  const userReq = await checkAuth(req, res);
  const userId = req.body.userId;
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
  let userId = req.body.userId;
  try {
    const updatedList = await follow(user, userId)
    res.json(updatedList)
  } catch (err) {
    res.json(err.message)
  }
})

router.put('/updateprofilepic', async (req, res) => {
  const user = await checkAuth(req, res);
  try {
    const url = req.body.url;
    const updatedUrl = await updateProfilePic(url, user._id)
    res.json(updatedUrl)
  } catch(err) {
    res.status(400).json(err.message)
  }
})

module.exports = router;