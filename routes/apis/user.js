const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Agent = require('../../models/Agents');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const moment = require('moment');


//@route GET api/user
//@desc Gets all Agents registered in the system
//@access Public*
router.get('/', auth, (req, res) => {
    
});


//@route POST api/user/register
//@desc REGISTERS NEW Agent
//@access Public*
router.post('/register', auth, (req, res) => {
    const {fullname, tel_no, dob, idType, idNumber, gender, device, area, superagent} = req.body;
    console.log(area)
    //validate input
    if( !fullname || !tel_no || !dob || !idType || !idNumber || !gender || !device || !area || !superagent ){
        return res.status(400).json("Please Provide All Required Registration Details")
    }
    const uname = fullname.split(" ").pop();
    const tail = Math.floor(Math.random() * 600) + 1;
    const byear = Number(dob.split("-")[0]);
    console.log(byear)
    const curryear = moment().year()
    console.log(curryear);
    const age = curryear-byear;
    console.log(age);
    const password = "12345";
    const ids  = `${idType} :: ${idNumber}`;
    const user_rank = "Agent";
    const username = `@${uname}${tail}`;
    console.log(username)
    
    //check for already existing user
    User.findOne({
        where :{
            tel_no
        }
    }).then(user=>{
        if(user){
            return res.status(400).json("User Already Exists")
        }

        //if user doesnt exist continue and register
        const newUser = new User({
            fullname,
            username,
            tel_no,
            password,
            user_rank
        });


        //Create Salt & Hash
        bcrypt.genSalt(10, (err,salt) =>{
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                .then(user =>{
                    //Dealing with all the data that belongs in the agent table
                    const newAgent = new Agent({
                        agent_id: user.user_id,
                        full_name: fullname,
                        age: age,
                        tel_no: user.tel_no,
                        ids: ids,
                        gender: gender,
                        assigned_device: device,
                        assigned_areas: area,
                        average_collection_ytd: null,
                        agent_or_superagent: superagent
                    });
                    newAgent.save()
                    .then(agent =>{                       
                        console.log({user}, {agent})
                    })
                    //signing the jwt token and prepping the server response
                    jwt.sign(
                        {id:user.user_id},
                        config.get('jwtSecret'),
                        {expiresIn: 3600},
                        (err, token) =>{
                            if(err) throw err;
                            res.status(200).json({
                                token,
                                user :{
                                    id:user.user_id,
                                    name: user.fullname,
                                    phone: user.tel_no,
                                    userlevel: user.user_rank,
                                    last_seen: user.last_seen                                  
                                }
                            });

                        }
                    )                  
                   
                }) 
            })
        })
    })
   
});



module.exports = router;