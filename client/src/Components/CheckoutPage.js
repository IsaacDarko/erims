import React from 'react';
import { useEffect, useState } from 'react';
import { PaystackButton } from 'react-paystack';
import { images } from '../constants';
import '../Styles/FormMain.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const CheckoutPage = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const history = useNavigate();
    const publicKey = "pk_live_859e5e52b848e1dc3c36600cdc451fe96b8a1394";
    const currency = 'GHS';
    const channels = ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer']
    const [amount, setAmount] = useState("");
    const [payee_name, setName] = useState("");
    const [tel_no, setPhone] = useState("");
    const [email, setEmail] = useState("gibbsdarko@gmail.com");

    const fetchPayeeDeets = () =>{
        const payeeDeets = JSON.parse(localStorage.getItem('payeedata'));
        console.log(payeeDeets)
        const {payee_name, amount, tel_no} = payeeDeets;
        setName(payee_name);
        setAmount(amount);
        setPhone(tel_no);
        setEmail(email);
        
        console.log(`${payee_name}, ${amount}, ${tel_no}`);    
    }

    const verifyPayment = () =>{
        console.log('running verified payment function');
        const email = email;
        const amount = amount;
        const phone = tel_no;

        const options={
            params: {
                email,
                amount,
                phone
            },
            headers:{
                'x-auth-token':token
            }
        }

        axios.get('api/payments/verify', options)
        .then((res) =>{
            console.log(res.data)
            const msg = res.data.msg;
            console.log(msg)
            const payeeData = res.data
            localStorage.setItem('payeedata',JSON.stringify(payeeData))
            alert(msg);
            history.push("/dasboard");
        })

    }




    useEffect(() =>{
        fetchPayeeDeets();
        console.log(`${payee_name}, ${amount}, ${tel_no}`)
    }, []);


    const componentProps = {
        email:'andreakumah@gmail.com',    
        amount,
        currency,
        channels,
        metadata: {    
          payee_name,    
          tel_no          
        },    
        publicKey,    
        text: "Pay Now",  
        className:"btn btn-classic btn-sm my-4",  
        onSuccess: () => 
            verifyPayment(),
        onClose: () => 
            alert("Transaction failed, Please try again"),    
      }
   


    return (
        
        <div className="container">
        <div className="row justify-content-center align-middle py-5">
            <div className="col-md-4 my-5">
                <div className="card card-signup z-depth-1 p-2">
                    <div className="card-body text-center">
                    <img src={images.logo3} className="logo img-fluid"/>
                    

                        <form>
                            <div className="mb-3">
                                
                                <input className="form-control border-0 border-bottom" value={payee_name} type="text" name="name" id="name" placeholder={`${payee_name}`} disabled/>

                            </div>

                            <div className="mb-3">
                                
                                <input className="form-control border-0 border-bottom" value={amount} type="text" name="amount" id="amount" placeholder={`${amount}`} disabled/>

                            </div>

                            <div className="mb-3">

                                <input className="form-control border-0 border-bottom" value={tel_no} type="text" name="tel_no" id="tel_no" placeholder={`${tel_no}`} disabled/>

                            </div>

                        </form>
                    <div className="card-foter d-grid gap-2">
                        <PaystackButton {...componentProps} />
                    </div>

            </div>
    
                </div>
            </div>
        </div>
    </div>

       
    )
}

export default CheckoutPage
