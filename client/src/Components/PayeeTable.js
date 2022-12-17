import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Pagination from './components/Pagination';
import swal from 'sweetalert';


const PayeeTable = () => {
    const [payees, setPayees] = useState([]);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const token = JSON.parse(localStorage.getItem('token'));
    const agent = JSON.parse(localStorage.getItem('agent'));
    const history = useNavigate(); 
    const [currentPage, setcurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(10)


    const searchData = (e) =>{
        if(e.target.value === ''){
            setSearch('')
            setData(payees)
        }else{
            setSearch(e.target.value)
        }
    }




    const payeeLoadout = () =>{
        if(!agent || !token ||!agent && !token || agent && !token || !agent && token){
            history.push('/');
            swal("Please Log In", "You were logged out because your token expired", "error");
        }else{
            
            const {id, name, phone, level, see} = agent;
            console.log(id);
            const agent_id = Number(id);
            console.log(agent_id);

            const options={ 
                
                params:{
                    agent_id
                },

                headers:{
                    'x-auth-token':token
                }
            }

            if(level === 'SuperUser'){
                axios.get('api/payee/', options)
                .then(res =>{
                    const reply = res.data;
                    if(!res){
                        alert('there was a problem with your request')
                    }
                    else if(reply.msg === 'token is not valid'){
                        history.push('/');
                        swal("Please Log In", "You were logged out because your token expired", "error");
                    }else{
                        const clients = res.data;
                        console.log(clients);
                        const count = clients.length;
                        console.log(count);
                        setPayees(clients);
                        setData(clients)
                    }
                })
            }else{
                axios.get('api/payee/for', options)
                .then(res =>{
                    if(!res){
                        alert('there was a problem with your request')
                    }else{
                        const clients = res.data;
                        console.log(clients);
                        const count = clients.length;
                        console.log(count);
                        setPayees(clients);
                        setData(clients)
                    }
                })
            }
        }
    }





    const FilterData = (e) => {
        e.preventDefault();
        let arrData = payees
        
        let arr = payees.filter((item) => {
            if (search == item.full_name || search ==  item.tel || search == item.tel_no ||search ==  item.location || 
                search == item.last_payment_date){
                    return item
                } 
            })
            console.log(arr)
            setData(arr)
            if (search =="") setData(arrData)
  }


  //Get current posts
  const indexOfLastPost  = currentPage * postPerPage;
  const indexOfFirstPost  = indexOfLastPost - postPerPage;
  const currentPosts = data.slice(indexOfFirstPost,indexOfLastPost);
  
  //setData(currentPosts)

  //Change page
  const paginater = (pageNumber) => setcurrentPage(pageNumber)


    useEffect(()=>{
        payeeLoadout()
    },[])

    const proceed = () =>{
        history.push('/payee-register')
    }

    return (
        <div className="container">

            <div className="row">
                <div className="col-sm-6">
                    <button className="btn btn-classic" onClick={proceed}>
                        Add New Payee
                    </button>
                </div>

                <div className="col-sm-3"></div>

                <div className="col-sm-3">
                <form className="form-inline mt-2 ml-2 float-right">
                    <div className="form-group">
                      <input className="myInput form-control" type="text" placeholder="Search" value={search} 
                        onChange = {e => searchData(e)}/>
                    </div>
                    <button className="btn btn-sm btn-primary" onClick={FilterData}>
                       
                    Search</button>
                  </form>
                </div>

            </div>


            <div className="row">
                <div className="col-sm-2">
                    <select className="form-select" aria-label="Default select example">
                    <option selected disabled>Bulk Action</option>
                        <option value="1">Rename</option>
                        <option value="2">Delete</option>
                        <option value="3">Select</option>
                    </select>
                </div>
                <div className="col-sm-2">
                    <button className="btn btn-sm btn-primary">Apply</button>
                </div>
            </div>




            <table className="table table-bordered">
                <thead className="table-dark thead-dark">
                    <th></th>
                    <th>FULL NAME</th>
                    <th>TELEPHONE NUMBER</th>
                    <th>LOCATION</th>
                    <th>LAST PAYMENT DATE</th> 
                </thead>
                <tbody>
                    {currentPosts.map((payee) => (
                        <tr key={payee.customer_id} className="">
                            <td className="">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            </td>
                            <td>{payee.full_name}</td>
                            <td>{payee.tel}</td>
                            <td>{payee.location}</td>
                            <td>{payee.last_payment_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination postPerPage = {postPerPage} totalPosts={data.length} paginate= {paginater} />
        </div>
    )
}

export default PayeeTable
