const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const {
  check,
  validationResult
} = require('express-validator');


const userSchema = require('../models/User.js')
const User = require('../models/User');

//@route    GET api/register
//@desc     Test register a user route
//@access   Public 
router.get('/register', (req, res) => 
  res.send('Register user here')
);

//@route    POST api/register
//@desc     Register a user
//@access   Public 
router.post(
  '/register',
  [
    check('firstName', 'First name is required!')
    .not()
    .isEmpty(),
    check('lastName', 'Last name is required!')
    .not()
    .isEmpty(),
    check('email', 'Email must be valid!')
    .isEmail(),
    check('password', 'Must be a valid password!')
    .isLength({
      min: 5
    })
    .withMessage('must be at least 5 chars long!')
    .matches(/\d/).withMessage('must contain a number'),
  ],
  async (req, res) => {
    console.log('start register route');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      })
    }
    //get user data from request body
    const {
      firstName,
      lastName,
      email,
      password
    } = req.body;
    console.log(req.body);
    try {
      //find if user exists in database
      
      let existingUser = await User.findOne({
        email
      });
      console.log(existingUser);
      if (existingUser) {
        console.log('User already exists');
        return res
          .status(400)
          .json({
            errors: [{
              msg: 'User already exists'
            }]
          });
         
      }
      console.log('TESTTTTT1')
      const user = new User({
        firstName,
        lastName,
        email,
        password
      });
      console.log('TESTTTTT2')
      // generate salt
      const salt = await bcrypt.genSalt(10);
      console.log('TESTTTTT3')
      //create hashed password
      user.password = await bcrypt.hash(password, salt);
      console.log('TESTTTTT4')
      //free object so it cannot be altered
      // Object.freeze(user);
      
      //save user to database with newly hashed password
      await User.create(user);
      // await db.users.insertOne(user);
      console.log('TESTTTTT5')
      //create payload object for web token
      const payload = {
        user: {
          id: user.id //get id from mongodb
        }
      };
      //return json webtoken
      jwt.sign(
        payload,
        config.get('jwtSecret'), {
          expiresIn: 360000
        }, //remove two zeros for production
        (err, token) => {
          if (err) throw err;
          res.json({
            token
          });
        }
      );
      console.log("user saved to database with token");
      // res.send('Welcome, ' + user.firstName);
      res.redirect('/');
    } catch (err) {
      console.log('CAUGHT ERRORS: ' + err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;