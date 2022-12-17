import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import swal from 'sweetalert';

const AgentTable = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [agents, setAgents] = useState([]);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const token = JSON.parse(localStorage.getItem('token'));
    const sAgent = JSON.parse(localStorage.getItem('agent'));
    const history = useNavigate(); 


    const Authenticate = () =>{
        const token = JSON.parse(localStorage.getItem('token'));
        const agent = JSON.parse(localStorage.getItem('agent'));
        if(!agent || !token ||!agent && !token || agent && !token || !agent && token){
            history.push('/');
            swal("Please Log In", "You were logged out because your token expired", "error");
        }else{
            const {id, full_name, tel_no, level, see} = agent;
            const rank = level;
            console.log(rank)
            if(rank !== 'SuperUser'){
                history.push('/dashboard')
            }else if(rank === 'Agent'){
                alert('You are not authorized to view this page')
                history.push('/dashboard')
            }else{
                setIsAuthorized(true);
            }
        }
    }




    const searchData = (e) =>{
        if(e.target.value === ''){
            setSearch('')
            setData(agents)
        }else{
            setSearch(e.target.value)
        }
    }




    const agentLoadout = () =>{
        if(!sAgent || !token ||!sAgent && !token || sAgent && !token || !sAgent && token){
            history.push('/');
            swal("Please Log In", "You were logged out because your token expired", "error");
        }else{
            
            const {id, name, phone, user_rank, see} = sAgent;
            console.log(id);
            const sAgent_id = Number(id);
            const options={ 
                
                params:{
                    id
                },

                headers:{
                    'x-auth-token':token
                }
            }

            axios.get('api/agents/', options)
            .then(res =>{
                const agents = res.data
                if(!res){
                    alert('there was a problem with your request')
                }else if(agents.msg === 'token is not valid'){
                    history.push('/');
                    console.log('Your token is expired, please log in once more')
                }else{
                    console.log(agents);
                    const count = agents.length;
                    console.log(count);
                    setAgents(agents);
                    setData(agents)
                }
            })
        }
    }





    const FilterData = (e) => {
        e.preventDefault();
        let arrData = agents
        
        let arr = agents.filter((item) => {
            if (search == item.full_name || search ==  item.tel || search == item.tel_no ||search ==  item.location || 
                search == item.last_payment_date){
                    return item
                } 
            })
            console.log(arr)
            setData(arr)
            if (search =="") setData(arrData)
    }




  useEffect(() => {
    Authenticate();
    agentLoadout();
  }, [])

  
    const proceed = () =>{
        history.push('/agent-register')
    }



    return (
        <div className="container">

            <div className="row">
                <div className="col-sm-6">
                    <button className="btn btn-classic" onClick={proceed}>
                        Add New Agent
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
                    <th>ASSIGNED LOCATION</th>
                    <th>REGISTERED</th>
                    <th>ASSIGNED DEVICE</th> 
                </thead>
                <tbody>
                    {data.map((agent) => (
                        <tr className="">
                            <td className="">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            </td>
                            <td>{agent.full_name}</td>
                            <td>{agent.tel_no}</td>
                            <td>{agent.assigned_areas}</td>
                            <td>{agent.createdAt}</td>
                            <td>{agent.assigned_device}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <nav aria-label="Page navigation example ">
            <ul className="pagination text-center justify-content-center">
                <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
                </li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#">4</a></li>
                <li className="page-item"><a className="page-link" href="#">5</a></li>
                <li className="page-item"><a className="page-link" href="#">6</a></li>
                <li className="page-item"><a className="page-link" href="#">7</a></li>
                <li className="page-item"><a className="page-link" href="#">8</a></li>
                <li className="page-item"><a className="page-link" href="#">9</a></li>
                <li className="page-item"><a className="page-link" href="#">10</a></li>
                <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
                </li>
            </ul>
            </nav>
  
        </div>
    )
}

export default AgentTable
