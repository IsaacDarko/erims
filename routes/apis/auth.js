const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Agent = require('../../models/Agents');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const moment = require('moment');
const auth = require('../../middleware/auth');


//@route POST api/user/register
//@desc Authenticates System Users
//@access Public*
router.post('/', (req, res) => {
    const {tel_no, password } = req.body;
    const today = moment();
    //validate input
    if(!tel_no || !password){
        return res.status(400).json("Please Provide Login Details")
    }
    //check for already existing user
    User.findOne({
        where :{ 
            tel_no
        }
    }).then(user=>{
        if(!user){
            return res.status(200).json({
                auth:false,
                token:null,
                user:{},
                message:"User does not exist"
            })
        }

        User.update(
            { last_seen: today },
            { where: { tel_no } }
        )
        //Validate Password
        bcrypt.compare( password, user.password )
        .then(isMatch =>{
            if(!isMatch) return res.status(400).json({
                auth:false,
                token:null,
                user:{},
                 msg:"Invalid Credentials"
                });
            jwt.sign(
                {id:user.user_id},
                config.get('jwtSecret'),
                {expiresIn: 3600},
                (err, token) =>{
                    if(err) throw err;
                    res.status(200).json({
                        auth:true,
                        token,
                        user :{
                            id:user.user_id,
                            name: user.fullname,
                            phone: user.tel_no,
                            userlevel: user.user_rank,
                            last_seen: user.last_seen                                  
                        },
                        message:"Logged in successfully"
                    });

                }
            )

        })

    })
   
});


//@route POST api/auth/verify-token
//@desc validates user tokens
//@access Public*
router.get('/verify-token', auth, (req, res) => {
    const checking = req.query.msg
    if(checking === 'clear'){
        res.json('Copy, still valid champ')
        console.log('Users token is still valid')
    }else{
        console.log('Something crazy is going on with this users token')
    }
})



module.exports = router;