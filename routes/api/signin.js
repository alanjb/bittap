const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

//https://developer.okta.com/blog/2018/08/17/build-and-understand-user-authentication-in-node
//https://developer.okta.com/blog/2017/03/30/react-okta-sign-in-widget
//https://developer.okta.com/blog/2018/02/06/build-user-registration-with-node-react-and-okta
//https://developer.okta.com/blog/2019/09/11/angular-mongodb

// @route    GET api/signin
// @desc     Test route
// @access   Public
router.get('/', (req, res) => 
  res.send('Landing page...')
);

//@route    POST api/signin
//@desc     Authenticate user and token
//@access   Public
router.post(
  '/', [
    check('email').isEmail(),
    check('password').isLength({min: 5})
  ],
  async (req,res) => {
    console.log('starting sign in...')
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      console.log('ERROR: validation failed');
      return res.status(400).json({errors: errors.array() })
    }
    console.log('input validation passes')
    //once it passes error validation test 
    const { email, password } = req.body;

    try {
      //find if user exists in DB
      let existingUser = await User.findOne({ email});
      if (!existingUser) {
        return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid Credentials' }] })
        .redirect('/'); 
      }

      const isMatch = await bcrypt.compare(password, existingUser.password);

      if(!isMatch){
        console.log("password did not match");
        return res
        .status(400)
        .json({ errors: [{ msg: 'Invalid Credentials' }]}) 
        .redirect('/'); 
      }

      const payload = {
        existingUser: {
          id: existingUser.id //get id from mongodb
        }
      };

      //return json webtoken
      jwt.sign(
        payload, 
        config.get('jwtSecret'),
        { expiresIn: 360000 }, //remove two zeros for production for less expiration time for end user
        (err, token) => {
          if(err) throw err;
          res.json({ token });
        }
      );
     
    }
    catch(err){
      console.log('ERROR: ' + err.message);
      return res.status(500).send('Server error - could not authenticate');
    }
    console.log("SUCCESS: sign in success")
    res.redirect('/dashboard'); 
  }
);

module.exports = router;