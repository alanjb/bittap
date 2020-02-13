const express = require('express');
const router = express.Router();

// @route    POST home page after user signs in
// @desc     Test route
// @access   Private
// router.post(
//     '/dashboard', 
//     async(req,res) => {
//         try{
//             const user = await User.findById(req.user.id).select('-password');
//             res.json(user);
//             res.send('home page')
//         }
//         catch (err){
//             console.error(err.message);
//             res.status(500).send('Server Error');
//         }
//     }
// );

module.exports = router;