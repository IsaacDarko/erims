import React,{useState,useEffect} from 'react';
import { images } from '../../constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {v1 as uuid} from "uuid";
import moment from 'moment';
import swal from 'sweetalert';
import { PaystackButton } from 'react-paystack'; 


const Checkout = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  const history = useNavigate();
  const publicKey = "pk_live_859e5e52b848e1dc3c36600cdc451fe96b8a1394";
  const currency = 'GHS';
  const channels = ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'];
  const paytypes = ['Payment-Type', 'Cash', 'Momo', 'Bank-Transfer', 'Qr'];
  let [payButton, setPayButton] = useState()
  const [amount, setAmount] = useState(0);
  const [momoNumber, setMomo] = useState("");
  const [reason, setReason] = useState("");
  const [fullname, setFullname] = useState("");
  const [payType, setPayType] = useState("");
  const [isCash, setIsCash] = useState(false);
 

    
   //Send Receipt 
   const sendReceipt = () => {
    console.log('receipt started')
    const token = JSON.parse(localStorage.getItem('token'));
    const number = '233'+parseInt(momoNumber, 10)
    console.log(reason)
    console.log(amount) 
    console.log(number)  
    //SMS message to sender
    const options = {
      params:{
        num: number,
        amount: amount,
        reason: reason
      },
      headers:{
        'x-auth-token' : token
      }
    }     
    //Send Message
    axios.get('api/payments/sms',options)
    .then((res)=>{
      console.log('sms fired')
    })         
  } 
  

 //
  const submit = () =>{
    console.log(amount)
    console.log(reason)
    console.log('starting submit')
    const today = moment();
    const now = moment(today).format("hh:mm:ss a");
    console.log(`date: ${today} and time: ${now}`)
    const reference_no = uuid()
  
    const token = JSON.parse(localStorage.getItem('token'))
    const agent = JSON.parse(localStorage.getItem('agent'))
  
    console.log(token)
  
    const collector = agent.name
  
    const newPayment = {
      date:today,
      time:now,
      tel_no:momoNumber,
      payee_name:fullname,
      payment_type:payType,
      ref_no:reference_no,
      reason,
      amount,
      collector,
      remark:'paid'
    }
  
    const options = {
      headers:{
        'x-auth-token':token
      }
    }

    axios.post('api/payments/new',newPayment,options).then((res) =>{
      console.log(res.data)
      const payeeData = res.data
      console.log(payeeData)
      const {payment_type, payee_name, tel_no}= payeeData;
      swal(`${payee_name}'s`," payment has been received successfully", "success")
      sendReceipt();
      history.push("/payment-table")     
    })
    }
    
    

    const completePayment = () =>{
      submit();
      history.push("/")
    }
    
   //
    const componentProps = {
      email:'andreakumah@gmail.com',    
      amount: amount*100,
      currency,
      channels,
      metadata: {    
        fullname,    
        tel_no: momoNumber        
      },    
      publicKey,    
      text: "Pay On Digital Portal",  
      className:"btn btn-classic btn-sm my-4",  
      onSuccess: () => {
                  completePayment();
                } 
              ,
      onClose: () => 
              swal("Failed"," Please try making the transaction again ", "error"),    
    }



    const setPaymentButton = (e) =>{
      setPayType(e.target.value)
      console.log(payType)
      console.log(amount)
      console.log(reason)
    }


    
    
    
    useEffect(() =>{
      if(isCash === true){
          console.log(payType)
            setPayButton(<button className="btn btn-classic" onClick={ submit }>Pay Now</button>)
      }else if (isCash === false){
            console.log(payType)
            setPayButton(<PaystackButton {...componentProps} />)
      }
    }, [isCash, amount, reason])

    
    

    
    useEffect(() =>{
      if(payType === 'Cash'){
        setIsCash(true)
      }else{
        setIsCash(false)
      }
    }, [payType, amount, reason]);





    const verify = () =>{
      const momo = momoNumber;
      const options = {
        params:{
          phone : momo
        },
        headers:{
          'x-auth-token':token
        }
      }
    
      axios.get('api/payments/getpayee',options)
      .then((res) =>{
        const payee = res.data;
        const {msg, name} = payee
        console.log(name);
        if(msg === 'Registered'){
            setFullname(name.full_name)
        }else{
          setFullname('Unregistered')
        }       
      })
    }




    return (
        <div className="container">
            <div className="row justify-content-center align-middle py-5">
                <div className="col-md-4 my-5">
                    <div className="card card-signup z-depth-1 p-2">
                        <div className="card-body text-center">
                        <img src={images.logo5} className="logo img-fluid"/>
                        
                        <div className="row col-md-12">
                          <div className="col-md-9">
                            <input type="text" id="momoNumber" placeholder="Momo Number" name="momoNumber" className="myInput form-control" 
                                value={momoNumber} onChange={e =>setMomo(e.target.value)} required/>
                          </div>
                          <div className="col-md-3">
                                <button className="btn btn-sm btn-classics" onClick={verify}>Verify</button>
                          </div>
                        </div>

                      <div className="mb-3">
                        <input type="text" id="fullname" placeholder="Full Name" name="myInput fullname" className="myInput form-control" 
                        value={fullname} onChange={e => setFullname(e.target.value)} required/>
                      </div>

                      <div className="mb-3">
                      <select className="form-select form-select-sm" value={payType} onChange={e => setPaymentButton(e)}>
                            {
                              paytypes.map(paytype=>
                                <option value={paytype}>{paytype}</option>
                              )
                            }
                        </select>
                      </div>

                      <div className="mb-3">
                      <select className="myInput form-select form-select-sm" value={reason} onChange={e => setReason(e.target.value)}>
                            <option value="" disabled>Reason For Payment</option>
                            <option value="property-tax">Property Tax</option>
                            <option value="sewage-fee">Sewage Fee</option>
                            <option value="value-added-tax">Value Added Tax</option>
                        </select>
                      </div>
                     
                      <div className="mb-3">
                        <input type="text" id="amount" placeholder="Amount" name="amount" value={amount} className="myInput form-control" 
                        onChange={e => setAmount(e.target.value)} required/>
                      </div>

                      
                      <div className="card-foter d-grid gap-2">
                        {payButton}
                      </div>                      
                    </div>
                 </div>
               </div>
            </div>
        </div>
    )
}

export default Checkout
