const express = require('express');
const router = express.Router();

//@route    GET api/profile
//@desc     Test view user profile route
//@access   Private 
router.get('/profile', (req, res) => 
  res.send('View profile here')
);

module.exports = router;