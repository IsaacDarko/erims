const express = require('express');
const { Op } = require("sequelize");
const router = express.Router();
const Payments = require('../../models/Payments');
const Agent = require('../../models/Agents');
const Payee = require('../../models/Payee');
const auth = require('../../middleware/auth');
const axios = require('axios')
const moment = require('moment')



//@route GET api/payments/sms
//@desc Send Sms when payee is registered
//@access Private*
router.get('/sms', auth, async function (req, res){
    try{
        const today = moment();
        const time = moment(today).format("hh:mm:ss a");
        const day = moment(today).format('dddd');
        const date = moment().format("DD/MM/YYYY")
        const number = req.query.num;
        const amount = req.query.amount;
        const reason = req.query.reason;
        
        const SMS = `Confirmed.Your payment of GHC${amount}, for the purpose of ${reason} has been recieved on ${day} the ${date} at ${time}`
        //SMS message to sender     
        await axios.post(`http://sms.apavone.com:8080/bulksms/bulksms?username=tsg-teksup&password=Mirlin12&type=0&dlr=0&destination=${number}&source=eRIMS&message=${SMS}`)
        .then(response =>{
            console.log(number);
            console.log(today);
            console.log(time);
            console.log(reason);
            res.json('Check for message')
        })
    }catch(err){
        console.log(err)
    }
});






//@route GET api/payments/verify
//@desc Gets all tax payers registered in the system
//@access Private*
router.get('/verify', (req, res) =>{ 
    const phone = req.query.phone;
    console.log(phone)
    if(!phone){
        res.json({
            msg: 'Payment Failed: Still pending'
        })        
    }else{
        Payments.update(
            { remark: 'paid' },
            { where: { tel_no: phone} }
        )
        .then(res =>{
            res.json({
                paid: 'true',
                msg:'Payment:successful and remark:Paid'
            }) 
        })          
               
    }
});








//@route GET api/payments
//@desc Gets all tax payers registered in the system
//@access Private*
router.get('/', auth, (req, res) => {
    Payments.findAll({
        order: [
            ['transaction_id', 'DESC']
        ],
    })
    .then(payments=>{
        if(!payments){
            res.status(404).json("There was an unknown error")
        }else{
            console.log(payments);
            res.status(200).json({payments})
        }        
    })
   
});




//@route GET api/payments/for
//@desc Gets all tax payers registered in the system
//@access Private*
router.get('/for', auth, (req, res) => {
    const collector = req.query.name
    Payments.findAll({
        where:{
            collector
        }
    })
    .then(payments=>{
        if(!payments){
            res.status(404).json("There was an unknown error")
        }else{
            console.log(payments);
            res.status(200).json({payments})
        }        
    })
   
});






//@route GET api/payments/daily
//@desc Gets all transaction registered to a particular Agent
//@access Private*
router.get('/daily', auth, (req, res) => {
    const id = req.query.id;
    const date = req.query.date;
    Agent.findOne({
        attributes:['full_name'],
        where:{
            agent_id : id
        }
    }).then(agent =>{
        const collector = agent.dataValues.full_name
        console.log(agent.dataValues.full_name)
        Payments.findAll({
            where : {
                date,
                collector
            }
        })
        .then(revenue=>{
            if(!revenue){
                res.status(404).json("There was an unknown error")
            }else{
                console.log(revenue);
                res.status(200).json(revenue)
            }        
        })
    })
   
});







//@route GET api/payments/monthly
//@desc Gets all transaction registered to a particular Agent for a particular month
//@access Private*
router.get('/monthly', auth, (req, res) => {
    const id = req.query.id;
    let thisMonth = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
        
    let month = year + "-" + thisMonth
        
    let  date = new Date(month)
    let from = new Date(month)
    let to = new Date(date.getFullYear(),date.getMonth() +1, 0)
    console.log(`from is ${from}. date is ${date} & to is ${to}`);

    Agent.findOne({
        attributes:['full_name'],
        where:{
            agent_id : id
        }
    }).then(agent =>{
        const collector = agent.dataValues.full_name
        console.log(agent.dataValues.full_name)
        Payments.findAll({
            where : {
                [Op.and]:{
                     date : {[Op.gte]:from, [Op.lte]:to }
                },
                collector
            }
        })
        .then(revenue=>{
            if(!revenue){
                res.status(404).json("There was an unknown error")
            }else{
                console.log(revenue);
                res.status(200).json(revenue)
            }        
        })
    })
   
});







//@route GET api/payments/yearly
//@desc Gets all transaction registered to a particular Agent for a particular year
//@access Private*
router.get('/yearly', auth, (req, res) => {
    const id = req.query.id;
    let year = new Date().getFullYear();
    let from = new Date(year, 0, 1)
    let to = new Date(year, 11, 31)
    console.log(`from is ${from} and to is ${to}`);
    Agent.findOne({
        attributes:['full_name'],
        where:{
            agent_id : id
        }
    }).then(agent =>{
        const collector = agent.dataValues.full_name
        console.log(agent.dataValues.full_name)
        Payments.findAll({
            where : {
                [Op.and]:{
                     date : {[Op.gte]:from, [Op.lte]:to }
                },
                collector
            }
        })
        .then(revenue=>{
            if(!revenue){
                res.status(404).json("There was an unknown error")
            }else{
                console.log(revenue);
                res.status(200).json(revenue)
            }        
        })
    })
   
});








//@route POST api/payments/new
//@desc RECORDS NEW PAYMENT
//@access Private*
router.post('/new', auth, (req, res) => {
    const newPayment = req.body;
    const paytype = newPayment.payment_type;
    console.log(newPayment.amount);
    console.log(newPayment);



    const momoPayment = {
        date: newPayment.date,
        time: newPayment.time,
        reference_no: newPayment.ref_no,
        tel_no: newPayment.tel_no,
        payee_name: newPayment.payee_name,
        payment_type:newPayment.payment_type,
        reason:newPayment.reason,
        amount: newPayment.amount,
        email: newPayment.email,
        collector: newPayment.collector,
        remark: newPayment.remark
    };

    const cashPayment = {
        date: newPayment.date,
        time: newPayment.time,
        reference_no: newPayment.ref_no,
        tel_no: newPayment.tel_no,
        payee_name: newPayment.payee_name,
        payment_type:newPayment.payment_type,
        reason:newPayment.reason,
        amount: newPayment.amount,
        email: newPayment.email,
        collector: newPayment.collector,
        remark: 'paid'
    };

    if(paytype === 'cash'){
        Payments.create(cashPayment)
        .then( entry => {
            if(!entry){
                res.status(400).json('payment failed')
                console.log(entry);
                }else{
                res.status(200).json(entry)
                console.log(entry);
            }
        })
    }else{
        Payments.create(momoPayment)
        .then( entry => {
            if(!entry){
                res.status(400).json('payment failed')
                console.log(entry);
                }else{
                    const payment = entry.dataValues;
                    const {
                        transaction_id, 
                        date, 
                        time, 
                        reference_no, 
                        tel_no, 
                        payee_name, 
                        payment_type, 
                        reason, 
                        amount, 
                        email, 
                        collector
                     } = payment

                     const amountPyble = amount*100;

                     const data = {
                         transaction_id,
                         date,
                         time,
                         reference_no,
                         tel_no,
                         payee_name,
                         payment_type,
                         reason,
                         amount,
                         collector
                     }

                res.status(200).json(data)
                console.log(entry);
            }
    })

    }
    
   
});




//@route GET api/payments/getpayee
//@desc Gets all tax payers registered in the system
//@access Private*
router.get('/getpayee', auth, (req, res) =>{
    const tel = req.query.phone;
    Payee.findOne({
            attributes:['full_name'],
            where : {
                tel
            }
    }).then((name)=>{
        console.log(name)
        if(!name){
            res.status(200).json({msg:"Unregistered"})
        }else{
            res.status(200).json({
                msg:"Registered",
                name: name
            })
        }
        
    })

})



module.exports = router;