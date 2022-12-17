import React from 'react';
import { useState, useEffect } from 'react';
import '../Styles/FormMain.css';
import { useNavigate } from 'react-router-dom';
import { Col, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';



const FormMain = (props) =>{
    const { isAuthenticated } = useAuth0();

    const [payeeSurname, setPayeeSurname] = useState('');
    const [payeeFirstname, setPayeeFirstname] = useState('');
    const [payeeTel1, setPayeeTel1] = useState('');
    const [payeeTel2, setPayeeTel2] = useState('');
    const [payeeTinNo, setPayeeTinNo] = useState('');
    const [payeeEmail, setPayeeEmail] = useState('');
    const [payeeIdType1, setPayeeIdType1] = useState('');
    const [payeeIdNumber1, setPayeeIdNumber1] = useState('');
    const [payeeIdType2, setPayeeIdType2] = useState('');
    const [payeeIdNumber2, setPayeeIdNumber2] = useState('');
    const [payeeGender, setPayeeGender] = useState('');
    const [payeeMaritalStatus, setPayeeMaritalStatus] = useState('');
    const [payeeEducLevel, setPayeeEducLevel] = useState('');
    const [payeeBusinessSector, setPayeeBusinessSector] = useState('');
    const [payeeMarketSegment, setPayeeMarketSegment] = useState('');
    const [payeeAddress, setPayeeAddress] = useState('');
    const [payeeCustomerType, setPayeeCustomerType] = useState('');
    const [taxPayee, setTaxPayee] = useState('');
    const [payeeDob, setPayeeDob] = useState('');

    const history = useNavigate();


    const submit = (e) => {
        e.preventDefault(); 
    
        const payeeData = {
            surname:payeeSurname,
            firstname:payeeFirstname,
            tel1: payeeTel1,
            tel2: payeeTel2,
            tin_no: payeeTinNo,
            email: payeeEmail,
            id_type_1: payeeIdType1,
            id_number_1 : payeeIdNumber1,
            id_type_2 : payeeIdType2,
            id_number_2 : payeeIdNumber2,
            gender : payeeGender,
            maritalstat: payeeMaritalStatus,
            educ : payeeEducLevel,
            busisect: payeeBusinessSector,
            marketseg: payeeMarketSegment,
            address: payeeAddress,
            customertype: payeeCustomerType,
            tax_type: taxPayee,
            dob:payeeDob
        }
        axios.post('/api/payee/register', {
            payeeData
        })
        .then ((res)=>{
            const info = res.data
            console.log(info)
            alert("Confirmation was sent to Payee via Sms")     
        })
           
    }


    const cancel = () =>{
        history.push("/");
    }

    const cont = () =>{
        history.push("/transactions");
    }
    

    return(
        isAuthenticated && (

        <Container className="body_container container-fluid">
            <div className="col-12">
                <div className="col-md-1">

                </div>

                <div className="col-md-6">
                    <h1 className="legend">Tax Payee Registration</h1>
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

                        <div className="col-md-3">
                        <FormGroup row>
                            <Label for="surname" sm={4}>Surname</Label>
                            <Col sm={8}>
                            <Input className="myInput" value={payeeSurname} type="text" name="surname" id="surname" placeholder="payee surname" onChange={e => 
                            setPayeeSurname(e.target.value)}/>
                            </Col>
                        </FormGroup>
                        </div>

                        <div className="col-md-1"></div>

                        <div className="col-md-3">
                        <FormGroup row>
                            <Label for="exampleSelect" sm={4}>First Name</Label>
                            <Col sm={8}>
                            <Input className="myInput" value={payeeFirstname} type="text" name="first_name" id="first_name" placeholder="payee firstname" onChange={e => 
                            setPayeeFirstname(e.target.value)} />
                            </Col>
                        </FormGroup>
                        </div>
                    </div>


                    <div className="row components">
                        <div className="col-md-1">

                        </div>

                        <div className="col-md-3">
                        <FormGroup row>
                            <Label for="tel_no_1" sm={4}>Tel No 1</Label>
                            <Col sm={8}>
                            <Input className="myInput" value={payeeTel1} type="text" name="tel_no_1" id="tel_no_1" placeholder="payee telephone 1"  onChange={e => 
                            setPayeeTel1(e.target.value)}/>
                            </Col>
                        </FormGroup>
                        </div>

                        <div className="col-md-1"></div>

                        <div className="col-md-3">
                        <FormGroup row>
                            <Label for="tel_no_2" sm={4}>Tel No 2</Label>
                            <Col sm={8}>
                            <Input className="myInput" value={payeeTel2} type="text" name="tel_no_2" id="tel_no_2" placeholder="payee telephone 2" onChange={e => 
                            setPayeeTel2(e.target.value)}/>
                            </Col>
                        </FormGroup>
                        </div>
                        
                    </div>


                    <div className="row components">
                        <div className="col-md-1">

                        </div>

                        <div className="col-md-3">
                        <FormGroup row>
                            <Label for="tel_no_1" sm={4}>TIN No</Label>
                            <Col sm={8}>
                            <Input className="myInput" value={payeeTinNo} type="text" name="tin_no" id="tin_no" placeholder="TIN number" onChange={e => 
                            setPayeeTinNo(e.target.value)} />
                            </Col>
                        </FormGroup>
                        </div>

                        <div className="col-md-1"></div>

                        <div className="col-md-3">
                        <FormGroup row>
                            <Label for="email" sm={4}>Email Add</Label>
                            <Col sm={8}>
                            <Input className="myInput" value={payeeEmail} type="email" name="email" id="email" placeholder="email address" onChange={e => 
                            setPayeeEmail(e.target.value)}/>
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
                            <Label for="id1" sm={4}>National ID 1</Label>
                            <Col sm={8}>
                            <Input className="myInput" value={payeeIdNumber1} type="text" name="id1" id="id1" placeholder="First id number" onChange={e => 
                            setPayeeIdNumber1(e.target.value)}/>
                            </Col>
                        </FormGroup>
                        </div>                        
                        
                    </div>


                    <div className="row components">
                        <div className="col-md-1">

                        </div>

                        <div className="col-md-2">
                        <FormGroup row>

                            <Col sm={2}>
                                <Input value="nationalid" type="radio" name="national_id" id="national_id"  onChange={e => 
                            setPayeeIdType1(e.target.value)}/>
                            </Col>
                            <Label for="national_id" sm={6}>National Id</Label>
                            
                        </FormGroup>
                        </div>

                        <div className="col-md-2">
                        <FormGroup row>

                            <Col sm={2}>
                                <Input value="passport" type="radio" name="passport" id="passport"  onChange={e => 
                            setPayeeIdType1(e.target.value)}/>
                            </Col>
                            <Label for="passport" sm={3}>Passport</Label>
                            
                        </FormGroup>
                        </div>

                        <div className="col-md-2">
                        <FormGroup row>

                            <Col sm={2}>
                                <Input value="votersid" type="radio" name="select" id="exampleSelect" onChange={e => 
                            setPayeeIdType1(e.target.value)}/>
                            </Col>
                            <Label for="votersid" sm={7}>Voter's Id</Label>
                            
                        </FormGroup>
                        </div>

                        <div className="col-md-2">
                        <FormGroup row>

                            <Col sm={2}>
                                <Input value="driverslicense" type="radio" name="select" id="exampleSelect" onChange={e => 
                            setPayeeIdType1(e.target.value)} />
                            </Col>
                            <Label for="driverslicense" sm={8}>Driver's License</Label>

                        </FormGroup>
                        </div>
                        
                    </div>



                    <div className="gap">
                        <div className="col-md-12">
                        
                        </div>
                        
                    </div>



                    <div className="row components">
                        <div className ="col-md-1"></div>

                        <div className="col-md-4">
                        <FormGroup row>
                            <Label for="id2" sm={4}>National ID 2</Label>
                            <Col sm={8}>
                            <Input className="myInput" value={payeeIdNumber2} type="text" name="id2" id="id2" placeholder="Second Id number" onChange={e => 
                            setPayeeIdNumber2(e.target.value)}  />
                            </Col>
                        </FormGroup>
                        </div>
                        
                    </div>

                    <div className="row components">
                        <div className="col-md-1">

                        </div>

                        <div className="col-md-2">
                        <FormGroup row>

                            <Col sm={2}>
                                <Input value="nationalid" type="radio" name="nationalid" id="nationalid" onChange={e => 
                            setPayeeIdType2(e.target.value)}   />
                            </Col>
                            <Label for="nationalid" sm={6}>National Id</Label>
                            
                        </FormGroup>
                        </div>

                        <div className="col-md-2">
                        <FormGroup row>
                            <Col sm={2}>
                                <Input value="passport" type="radio" name="passport" id="passport" onChange={e => 
                            setPayeeIdType2(e.target.value)}  />
                            </Col>
                            <Label for="passport" sm={4}>Passport</Label>
                            
                        </FormGroup>
                        </div>

                        <div className="col-md-2">
                        <FormGroup row>
                            <Col sm={2}>
                                <Input value="voters" type="radio" name="voters" id="voters" onChange={e => 
                            setPayeeIdType2(e.target.value)}/>
                            </Col>
                            <Label for="voters" sm={6}>Voter's Id</Label>
                            
                        </FormGroup>
                        </div>

                        <div className="col-md-2">
                        <FormGroup row>
                            <Col sm={2}>
                                <Input value="driverslicense" type="radio" name="driverslicense" id="driverslicense" onChange={e => 
                            setPayeeIdType2(e.target.value)} />
                            </Col>
                            <Label for="driverslicense" sm={8}>Driver's License</Label>
                            
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

                        
                        <div className="col-md-2">
                        <FormGroup row>
                            <Label for="Gender" sm={6}>Gender:</Label>
                        </FormGroup>
                        </div>

                        <div className="col-md-2">
                        <FormGroup row>

                            <Col sm={2}>
                                <Input value="male" type="radio" name="male" id="male"  onChange={e => 
                            setPayeeGender(e.target.value)} />
                            </Col>
                            <Label for="male" sm={4}>Male</Label>
                            
                        </FormGroup>
                        </div>

                        <div className="col-md-2">
                        <FormGroup row>

                            <Col sm={2}>
                                <Input value="female" type="radio" name="female" id="female" onChange={e => 
                            setPayeeGender(e.target.value)} />
                            </Col>
                            <Label for="female" sm={4}>Female</Label>
                            
                        </FormGroup>
                        </div>
                        
                    </div>


                    <div className="row components">
                        <div className="col-md-1">

                        </div>


                        <div className="col-md-2">
                        <FormGroup row>
                            <Label for="marital_status" sm={8}>Marital Status:</Label>
                        </FormGroup>
                        </div>

                        <div className="col-md-2">
                        <FormGroup row>

                            <Col sm={2}>
                                <Input value="single" type="radio" name="single" id="single"  onChange={e => 
                            setPayeeMaritalStatus(e.target.value)}/>
                            </Col>
                            <Label for="single" sm={4}>Single</Label>
                            
                        </FormGroup>
                        </div>

                        <div className="col-md-2">
                        <FormGroup row>

                            <Col sm={2}>
                                <Input value="married" type="radio" name="married" id="married"  onChange={e => 
                            setPayeeMaritalStatus(e.target.value)}/>
                            </Col>
                            <Label for="married" sm={4}>Married</Label>
                            
                        </FormGroup>
                        </div>
                        
                    </div>


                   
                    <div className="row components">

                        <div className="col-md-1">

                        </div>

                        <div className="col-md-2">
                        <FormGroup row>
                            <Label for="educ_level" sm={8}>Education Level:</Label>
                        </FormGroup>
                        </div>

                        <div className="col-md-2">
                        <FormGroup row>

                            <Col sm={2}>
                                <Input value="noformal" type="radio" name="no_formal" id="no_formal"  onChange={e => 
                            setPayeeEducLevel(e.target.value)}/>
                            </Col>
                            <Label for="no_formal" sm={6}>No Formal</Label>
                            
                        </FormGroup>
                        </div>

                        <div className="col-md-2">
                        <FormGroup row>

                            <Col sm={2}>
                                <Input value="primary" type="radio" name="primary" id="primary"  onChange={e => 
                            setPayeeEducLevel(e.target.value)}/>
                            </Col>
                            <Label for="primary" sm={6}>Primary</Label>
                            
                        </FormGroup>
                        </div>

                        <div className="col-md-2">
                        <FormGroup row>

                            <Col sm={2}>
                                <Input value="secondary" type="radio" name="secondary" id="secondary"  onChange={e => 
                            setPayeeEducLevel(e.target.value)}/>
                            </Col>
                            <Label for="secondary" sm={6}>Secondary</Label>
                            
                        </FormGroup>
                        </div>

                        <div className="col-md-2">
                        <FormGroup row>

                            <Col sm={2}>
                                <Input value="tetiary" type="radio" name="tetiary" id="tetiary"  onChange={e => 
                            setPayeeEducLevel(e.target.value)}/>
                            </Col>
                            <Label for="tetiary" sm={6}>Tetiary</Label>
                            
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
                            <Label for="business_sector" sm={4}>Business Sector</Label>
                            <Col sm={8}>
                            <Input className="myInput" value={payeeBusinessSector} type="text" name="business_sector" id="business_sector" placeholder="business sector" onChange = {e =>
                            setPayeeBusinessSector(e.target.value)
                            } />
                            </Col>
                        </FormGroup>
                        </div>

                        <div className="col-md-1"></div>

                        <div className="col-md-4">
                        <FormGroup row>
                            <Label for="tel_no_1" sm={3}>Address</Label>
                            <Col sm={8}>
                            <Input className="myInput" value={payeeAddress} type="text" name="address" id="address" placeholder="address" onChange={e => 
                            setPayeeAddress(e.target.value)} />
                            </Col>
                        </FormGroup>
                        </div>
                        
                    </div>


                    <div className="row components">
                        <div className="col-md-1">

                        </div>

                        <div className="col-md-4">
                        <FormGroup row>
                            <Label for="customer_type" sm={4}>Customer Type</Label>
                            <Col sm={8}>
                            <Input className="myInput" value={payeeCustomerType} type="text" name="customer_type" id="customer_type" placeholder="customer type" onChange={e => 
                            setPayeeCustomerType(e.target.value)} />
                            </Col>
                        </FormGroup>
                        </div>

                        <div className="col-md-1"></div>

                        <div className="col-md-4">
                        <FormGroup row>
                            <Label for="tax_payee" sm={3}>Tax payee</Label>
                            <Col sm={8}>
                            <Input className="myInput" value={taxPayee} type="text" name="tax_payee" id="tax_payee" placeholder="tax payee" onChange={e => 
                            setTaxPayee(e.target.value)} />
                            </Col>
                        </FormGroup>
                        </div>
                        
                    </div>



                    <div className="row components">
                        <div className="col-md-1">

                        </div>

                        <div className="col-md-4">
                        <FormGroup row>
                            <Label for="dob" sm={4}>Date of Birth</Label>
                            <Col sm={8}>
                            <Input className="myInput" value={payeeDob} type="text" name="dob" id="dob" placeholder="date of birth" onChange={e => 
                            setPayeeDob(e.target.value)} />
                            </Col>
                        </FormGroup>
                        </div>

                        <div className="col-md-1"></div>

                        <div className="col-md-4">
                        <FormGroup row>
                            <Label for="market_seg" sm={4}>Market Segment</Label>
                            <Col sm={8}>
                            <Input className="myInput" value={payeeMarketSegment} type="text" name="payeeMarketSegment" id="payeeMarketSegment" placeholder="Market Segment" onChange={e => 
                            setPayeeMarketSegment(e.target.value)} />
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

                        <div className="col-md-2">
                        <FormGroup row>
                            <button className="main_buttons"  type="continue" onClick={cont}>Continue</button>
                        </FormGroup>
                        </div>
                                                                                                                                         
                        <div className="col-md-1"></div>

                        <div className="col-md-2">
                        <FormGroup row>
                            <button className="main_buttons" onClick={cancel} type="submit" >Cancel</button>
                        </FormGroup>
                        </div>

                        <div className="col-md-1"></div>

                        <div className="col-md-2">
                        <FormGroup row>
                            <button className="main_buttons" onClick={submit} type="submit">Submit</button>
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

export default FormMain;