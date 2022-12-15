const express = require('express');
const router = express.Router();
const Agents = require('../../models/Agents');
const auth = require('../../middleware/auth');
const axios = require('axios')
const moment = require('moment')



//@route GET api/agent/sms
//@desc Send Sms when payee is registered
//@access Private*
router.get('/sms', auth, async function (req, res){
    try{
        const today = moment();
        const time = moment(today).format("hh:mm:ss a");
        const day = moment(today).format('dddd');
        const date = moment().format("DD/MM/YYYY");
        const number = req.query.num;
        const fullname = req.query.name;
        const username = req.query.uname;

        const SMS = `Congratulations ${fullname}! Your eRIMS Agent account has been successfully created on ${day} the ${date} at ${time}. 
        Your Username is ${username} and your password is '12345'`;

        await axios.get(`http://sms.apavone.com:8080/bulksms/bulksms?username=tsg-teksup&password=Mirlin12&type=0&dlr=0&destination=${number}&source=eRIMS&message=${SMS}`)
            .then(response =>{
                console.log(response);
                res.json('Check for message')
            })
    }catch(err){
        console.log(err)
    }
});






//@route GET api/agents
//@desc Gets all tax agents registered in the system
//@access Private*
router.get('/', auth, (req, res) => {
        Agents.findAll({ 
            where:{
                role:'agent'
            }
        })
        .then(agents=>{
            if(!agents){
                res.status(404).json("There was an unknown error")
            }else{
                console.log(agents);
                res.status(200).json(agents)
            }        
        })    
   
});



/*
//@route GET api/payee
//@desc Gets all tax payers registered to a particular agent
//@access Private*
router.get('/for', auth, (req, res) => {
    const agent = req.query;
    const agent_id = agent.agent_id
    console.log(agent);
    //console.log(agent_id)
    Payee.findAll({
        where:{
            agent_id
        }
    })
    .then(payees=>{
        if(!payees){
            res.status(404).json("There was an unknown error")
        }else{
            console.log(payees);
            res.status(200).json(payees)
        }        
    })
   
});
*/





/*
//@route POST api/payee/register
//@desc REGISTERS NEW PAYEES
//@access Private*
router.post('/register', auth, (req, res) => {
    const newPayee = req.body;
    console.log(newPayee);
    const full_name = newPayee.firstname + ' ' + newPayee.surname;
    console.log(full_name)
    const ids = `${newPayee.idType} ${newPayee.idNumber}`
    Payee.create({
        full_name,           
        tel:newPayee.tel1,
        mobile_no: newPayee.tel2,
        ids,
        email:newPayee.email,
        tin_no:newPayee.tin_no,
        dob:newPayee.dob, 
        gender:newPayee.gender ,
        marital_status: newPayee.maritalstat,
        education_level:newPayee.educ ,
        business_sector:newPayee.busisect,
        market_segment: newPayee.marketseg,
        location: newPayee.address,
        customer_type: newPayee.customertype,
        last_payment_date: newPayee.date,
        payee_type:newPayee.payee_type,
        agent_id:newPayee.agent_id,
        dob:newPayee.dob    
    })
        .then( confirmation => {
            if(!confirmation){
                res.status(400).json('registration failed')
               
            }else{
                console.log(confirmation);
                res.status(200).json(confirmation)
            }
        }).catch(function(err) {
            // print the error details
            console.log(err);
        });  
   
});
*/



module.exports = router;