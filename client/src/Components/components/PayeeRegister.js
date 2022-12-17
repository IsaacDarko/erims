import React,{useState} from 'react';
import { images } from '../../constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import swal from 'sweetalert';


const PayeeRegister = () => {
  const history = useNavigate();
  const today = moment();
  const [surname, setSurname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [dob, setDob] = useState('');
  const [idType, setIdType] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [gender, setGender] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [education, setEducation] = useState('');
  const [taxId, setTaxId] = useState('');  
  const [taxType, setTaxType] = useState('');
  const [customerType, setCustomerType] = useState('');
  const [payeeType, setPayeeType] = useState('');
  const [sector, setSector] = useState('');
  const [segment, setSegment] = useState('');



  const clearFields = () =>{
    setSurname('')
      setFirstname('')
      setPhone1('')
      setPhone2('')
      setDob('')
      setIdType('') 
      setIdNumber('')
      setGender('')
      setMaritalStatus('')
      setAddress('')
      setEmail('')
      setEducation('')
      setTaxId('')
      setTaxType('')
      setCustomerType('')
      setPayeeType('')
      setSector('')
      setSegment('')
      
  }





    const sendReceipt = (tel) =>{
      console.log('receipt started')
      const token = JSON.parse(localStorage.getItem('token'));
      const agent = JSON.parse(localStorage.getItem('agent'));
      const number = '233'+parseInt(tel, 10)
      console.log(number)

      const options = {
        params:{
          num: number
        },
        headers:{
          'x-auth-token' : token
        }
      }     
      //Send Message
      axios.get('https://erims-api.onrender.com/api/payee/sms',options)
      .then((res)=>{
        console.log('sms fired')
      })

    }






  const register = (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem('token'));
    const agent = JSON.parse(localStorage.getItem('agent'));
    const {id} = agent;

    const data = {
      tel1:phone1,                tel2:phone2,
      firstname,                  surname,
        dob,                      maritalstat:maritalStatus,
        idType,                   address:address,
        idNumber,                 agent_id:id,
        email,                    educ:education,
        gender,                   tin_no: taxId, 
        customertype:customerType, date:today,
        payee_type:payeeType,     busisect:sector,  
        marketseg:segment
      }
 
      const options = {
        headers:{
          'x-auth-token':token
        }
      }

    axios.post('https://erims-api.onrender.com/api/payee/register', data,options)
    .then((res) => {
        console.log(res.data);
        const payee = res.data;
        const { full_name,tel } = payee;

        clearFields();

        swal(`${full_name} `, "has been registered successfully", "success");
        sendReceipt(tel)
        history.push('/payee-table');
    })
    .catch((err) => {
      swal("Something went wrong", err.data, "warning");
    })

}





    return (
        <div className="container">
          <div className="row justify-content-center align-middle py-5">

            <div className="col-md-12">

            <div className="card">
                <div className="card-body p-0">

                <div className="row">

                    <div className="col-md-6">
                        <img src={images.background1} className="bg img-fluid" alt="background image"/>
                    </div>

                    <div className="col-md-6">

                    <div className="row d-flex justify-content-center p-3">
                        <h5 className="my-3">
                        <strong>Tax Payee Registration</strong>
                        </h5>

                    
                    <div className="row mb-3">
                        <div className="col">
                            <input type="text" id="surname" placeholder="Surname" value={surname} className="myInput form-control  border-bottom" 
                            onChange={e => setSurname(e.target.value)}/>
                        </div>
                        <div className="col">
                            <input type="text" id="firstname" placeholder="First Name" value={firstname} className="myInput form-control border-bottom"
                             onChange={e => setFirstname(e.target.value)}/>
                        </div>
                    </div>
                   
                    <div className="mb-3">
                        <input type="date" id="dob" name="dob" value={dob} className="myInput form-control border-0 border-bottom" onChange={e => setDob(e.target.value)}/>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <input type="tel" id="phone1" value={phone1} placeholder="Mobile Number1" className="myInput form-control  border-bottom" 
                             onChange={e => setPhone1(e.target.value)}/>
                        </div>
                        <div className="col">
                            <input type="tel" id="phone2" value={phone2} placeholder="Mobile Number1" className="myInput form-control  border-bottom"
                              onChange={e => setPhone2(e.target.value)}/>
                        </div>
                    </div>
                   
                    <div className="row mb-3">
                    <div className="col">
                        <select className="form-select form-select-sm" value={idType}  onChange={e => setIdType(e.target.value)}>
                            <option value="" disabled> ID Type</option>
                            <option value="passport">Passport</option>
                            <option value="ghana_card">Ghana Card</option>
                            <option value="voters_id">Voter's ID</option>
                            <option value="drivers_license">Driver's License</option>
                        </select>
                    </div>
                    <div className="col">
                        <input type="text" className="myInput form-control border-bottom" placeholder="ID Number" value={idNumber}
                          onChange={e => setIdNumber(e.target.value)}/>
                    </div>
                    </div>
                    <div className="row mb-3">
                    <div className="col">
                      <select className="form-select form-select-sm" value={gender}  onChange={e => setGender(e.target.value)}>
                        <option value="" disabled>Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div className="col">
                        <input type="email" className="myInput form-control border-bottom" placeholder="Email" value={email} 
                          onChange={e => setEmail(e.target.value)}/>
                    </div>
                    </div>
                    <div className="row mb-3">
                    <div className="col">
                      <select className="form-select form-select-sm" value={maritalStatus}  onChange={e => setMaritalStatus(e.target.value)}>
                        <option value="" disabled>Marital Status</option>
                        <option value="1">Single</option>
                        <option value="2">Married</option>
                      </select>
                    </div>
                    <div className="col">
                        <input type="address" className="myInput form-control border-bottom" placeholder="Address" value={address} 
                        onChange={e => setAddress(e.target.value)}/>
                    </div>
                    </div>
                    <div className="row mb-3">
                    <div className="col">
                      <select className="form-select form-select-sm" value={education} onChange={e => setEducation(e.target.value)}>
                        <option value="" disabled>Level of Education</option>
                        <option value="no_formal">No Formal</option>
                        <option value="primary">Primary</option>
                        <option value="secondary">Secondary</option>
                        <option value="tetiary">Tetiary</option>
                      </select>
                    </div>
                    <div className="col">
                        <input type="text" className="myInput form-control border-bottom" placeholder="Tax ID No." value={taxId} 
                        onChange={e => setTaxId(e.target.value)}/>
                    </div>
                    </div>
                    <div className="row mb-3">
                    <div className="col">
                      <select className="form-select form-select-sm" value={customerType} onChange={e => setCustomerType(e.target.value)}>
                        <option value="" disabled>Customer Type</option>
                        <option value="market-woman">Market woman</option>
                        <option value="property-owner">Property owner</option>
                        <option value="landlord">Landlord</option>
                        <option value="store-or-table-top">Store/table top</option>
                        <option value="lumbering">Tree felling</option>
                        <option value="chop-bar">Chop bar</option>
                        <option value="car-owner">Car owner</option>
                      </select>
                    </div>
                    <div className="col">
                    <select className="form-select form-select-sm" value={payeeType} onChange={e => setPayeeType(e.target.value)}>
                        <option value="" disabled>Payee Type</option>
                        <option value="ground-rent">Ground rent</option>
                        <option value="sewage">sewage</option>
                        <option value="land-maintenance">Land maintenance</option>
                        <option value="property">Property</option>
                        <option value="facility-usage">Facility usage</option>
                      </select>
                    </div>
                    </div>
                    <div className="row mb-3">
                    <div className="col">
                      <select className="form-select form-select-sm" value={sector} onChange={e => setSector(e.target.value)}>
                        <option value="" disabled>Business Sector</option>
                        <option value="agriculture">Agriculture</option>
                        <option value="industrial-production">Industrial Production</option>
                        <option value="mobile-money-vendor">Mobile Money Vendor</option>
                        <option value="transport">Transport</option>
                        <option value="restaurants-and-eateries">Restaurants And Eateries</option>
                      </select>
                    </div>
                    <div className="col">
                    <select className="form-select form-select-sm" value={segment} onChange={e => setSegment(e.target.value)}>
                        <option value="" disabled>Market Segment</option>
                        <option value="individual">Individual</option>
                        <option value="sme">SME</option>
                        <option value="corporatives">Corporatives</option>
                      </select>
                    </div>
                    </div>

                    <div className="d-grid text-center">
                        <button className="btn btn-classic btn-sm my-2" onClick={register}>Create Account</button>
                    </div>

                    </div>
                  </div>
                </div>

                </div>
            </div>

            </div>

            </div>
        </div>
    )
}

export default PayeeRegister
