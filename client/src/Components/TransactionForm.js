import React from 'react';
import { useState, useEffect } from 'react';
import '../Styles/FormMain.css';
import { Col, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import {v1 as uuid} from "uuid";
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';



const TransactionForm = (props) => {
    const { isAuthenticated } = useAuth0();
    const history = useNavigate();
    const [payeeFullname, setPayeeFullname] = useState('');
    const [payeeTel, setPayeeTel] = useState('');
    const [amount, setAmount] = useState('');
    const [payeeEmail, setPayeeEmail] = useState('');
    const {user} = useAuth0();

    
    const pay = (e) => {
        e.preventDefault();
        console.log(user);
        console.log(user.name);
        const today = moment();
        const now = moment(today).format("hh:mm:ss a");
        console.log(`date: ${today} and time: ${now}`)
        const reference_no = uuid()
        console.log(`today's date is ${today} and the time is ${now}`)
        const paymentData = {
            date:today,
            time:now,
            ref_no:reference_no,
            tel_no:payeeTel,
            payee_name:payeeFullname,
            amount:amount,
            email:payeeEmail,
            collector:user.name
        }
        axios.post('api/payments/new', {
            paymentData
        }).then(res => {
            console.log(res.data)
            const info = res.data
            const { payee_name, tel_no, amount, email} = info;
            console.log(`${payee_name}, ${tel_no}, ${amount}, ${email}`);

            const payeeData = {
                name: payee_name,
                amount: amount,
                phone: tel_no,
                email: email
            }

            localStorage.setItem('payeedata', JSON.stringify(payeeData));
            const stuff = JSON.parse(localStorage.getItem('payeedata'));
            console.log(stuff);
            history.push("/paygate");
            
        })     
        
    }
    

    return(
        isAuthenticated && (
            <Container className="body_container container-fluid">
                <div className="col-12">
                    <div className="col-md-1">

                    </div>

                    <div className="col-md-6">
                        <h1 className="legend">Initiate A Transaction (Pay A Tax) </h1>
                    </div>
                </div>
                

                    <div className="gap">
                            <div className="col-md-12">
                            
                            </div>
                            
                    </div>


                <Form>
                    <div className="col-12">

                        <div className="row components">
                            <div className="col-md-1">

                            </div>

                            <div className="col-md-4">
                            <FormGroup row>
                                <Label for="fullname" sm={3}>Full Name</Label>
                                <Col sm={9}>
                                <Input className="myInput" value={payeeFullname} type="text" name="payeefullname" id="payeefullname" placeholder="payee fullname" onChange={e => 
                                setPayeeFullname(e.target.value)}/>
                                </Col>
                            </FormGroup>
                            </div>

                            <div className="col-md-1"></div>


                            <div className="col-md-4">
                            <FormGroup row>
                                <Label for="momonum" sm={4}>Momo Number</Label>
                                <Col sm={8}>
                                <Input className="myInput" value={payeeTel} type="text" name="payeetel" id="payeetel" placeholder="payee momo number" onChange={e => 
                                setPayeeTel(e.target.value)} />
                                </Col>
                            </FormGroup>
                            </div>
                        </div>                


                        <div className="gap">
                            <div className="col-md-12">
                            
                            </div>
                            
                        </div>


                        <div className="row components">
                            <div className="col-md-1">

                            </div>

                            <div className="col-md-4">
                            <FormGroup row>
                                <Label for="amount" sm={3}>Amount</Label>
                                <Col sm={9}>
                                <Input className="myInput" value={amount} type="text" name="amount" id="amount" placeholder="amount" onChange={e => 
                                setAmount(e.target.value)}/>
                                </Col>
                            </FormGroup>
                            </div>        

                            <div className="col-md-1"></div>

                            <div className="col-md-4">
                            <FormGroup row>
                                <Label for="amount" sm={3}>Email</Label>
                                <Col sm={8}>
                                <Input className="myInput" value={payeeEmail} type="text" name="email" id="email" placeholder="email" onChange={e => 
                                setPayeeEmail(e.target.value)}/>
                                </Col>
                            </FormGroup>
                            </div>                        
                            
                        </div>




                        <div className="gap">
                            <div className="col-md-12">
                            
                            </div>
                            
                        </div>




                        <div className="row button_components">
                            <div className="col-md-2"></div>

                            <div className="col-md-1"></div>

                            <div className="col-md-2">
                            <FormGroup row>
                                <button className="main_buttons" onClick={pay} type="submit">Make Payment</button>
                            </FormGroup>
                            </div>
                            
                        </div>



                        <div className="gap">
                            <div className="col-md-12">
                            
                            </div>
                            
                        </div>


                    </div>
                </Form>
            </Container>

        )
    )
    
}

export default TransactionForm;