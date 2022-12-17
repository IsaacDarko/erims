import React from 'react';
import { useState, useEffect } from 'react';
import PayeeUI from './PayeeUI';
import '../Styles/FormMain.css';
import AgentsUI from './AgentsUI';
import DailyPaymentsUI from './DailyPaymentsUI';
import MonthlyPaymentsUI from './MonthlyPaymentsUI';
import YearlyPaymentsUI from './YearlyPaymentsUI';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import AgentPerfromanceChart from './AgentPerfromanceChart';
import RevenueTracker from './RevenueTracker';
import GrowthTracker from './GrowthTracker'
import swal from 'sweetalert';


const Dashboard = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const history = useNavigate();
    const[isAuthenticated, setIsAuthenticated] = useState(false)
    const agent = JSON.parse(localStorage.getItem('agent'));
    const [isSuper, setIsSuper] = useState(false);
    const [agentName, setAgentName] = useState('');
    const [agentPhone, setAgentPhone] = useState('');
    const [agentLevel, setAgentLevel] = useState('');
    const [agentSee, setAgentSee] = useState('');
    const [payees, setPayees] = useState([]); //state for storing taxpayees for the current agent
    const [payeeCount, setPayeeCount] = useState(''); //state for storing the numbers of said payees
    const [apt, setApt] = useState([]); // state for storing all transaction collented by the current agent today
    const [aptCount, setAptCount] = useState(''); //state for storing the number of said transactions
    const [aptAmount, setAptAmount] = useState('');// state for storing the total amount received of said transactions
    const [apm, setApm] = useState([]); // state for storing all transaction collected by the current agent this month
    const [apmCount, setApmCount] = useState('');// state for storing the number of said transactions
    const [apmAmount, setApmAmount] = useState('');// state for storing the total amount received of said transactions
    const [apy, setApy] = useState([]); // state for storing all transactions collected by current agent this year
    const [apyCount, setApyCount] = useState('');// state for storing the number of said transactions
    const [apyAmount, setApyAmount] = useState('');// state for storing the total amount received of said transactions
    const [collectors, setCollectors] = useState([]);
    const [collectorNumber, setCollectorNumber] = useState(0)


    const agentLoadout = () =>{
        if (!agent || !token ||!agent && !token || agent && !token || !agent && token){
            history.push('/')
        }else{
            const {id, name, phone, level, see} = agent;
            console.log(`${id}, ${name}, ${phone}, ${level}, ${see}`);
            setAgentName(name);
            setAgentPhone(phone)
            setAgentLevel(level)
            setAgentSee(see)
        }
    }


    const reveal = () =>{
        if(!agent || !token ||!agent && !token || agent && !token || !agent && token){
            history.push('/');
            swal("Please Log In", "You were logged out because your token expired", "error");
        }else{
            const {id, name, phone, level, see} = agent;
            console.log(`${id}, ${name}, ${phone}, ${level}, ${see}`);
            console.log('revealing your rank now')
            const rank = level;
            if(rank === 'SuperUser'){
                console.log(rank)
                setIsSuper(true)
            }
        }
    }



    const collectorLoadout = () =>{
        if(!agent || !token ||!agent && !token || agent && !token || !agent && token){
            history.push('/');
            swal("Please Log In", "You were logged out because your token expired", "error");
        }else{
            const {id, name, phone, level, see} = agent;
            console.log(`${id}, ${name}, ${phone}, ${level}, ${see}`);
            const rank = level;
            if(rank === 'SuperUser'){
                const options={ 
                
                    params:{
                        id
                    },
        
                    headers:{
                        'x-auth-token':token
                    }
                }
                axios.get('https://erims-api.onrender.com/api/agents',options)
                .then((res)=>{
                    const collectors = res.data;
                    const count = collectors.length;
                    console.log(collectors)
                    if(collectors.msg === 'token is not valid'){
                        history.push('/')
                    }else{
                        setCollectors(collectors)
                        setCollectorNumber(count)
                    }                
                })

            }else{
                console.log('You are just a regular agent')
            }
        }
    }

    


    const payeeLoadout = () =>{
        if(!agent || !token ||!agent && !token || agent && !token || !agent && token){
            history.push('/');
            swal("Please Log In", "You were logged out because your token expired", "error");
        }else{
            const {id, name, phone, level, see} = agent;
            console.log(`${id}, ${name}, ${phone}, ${level}, ${see}`);
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
                axios.get('https://erims-api.onrender.com/api/payee/', options)
                .then(res =>{
                    const payees = res.data
                    if(!res){
                        alert('there was a problem with your request')
                    }else if(payees.msg === 'token is not valid'){
                        history.push('/')
                        console.log('Your token has expired, please log in once more')
                    }else{
                        const clients = res.data;
                        console.log(clients);
                        const count = clients.length;
                        console.log(count);
                        setPayeeCount(count);
                        setPayees(clients);
                    }
                })
            }else{
                axios.get('https://erims-api.onrender.com/api/payee/for', options)
                .then(res =>{
                    const payees = res.data
                    if(!res){
                        alert('there was a problem with your request')
                    }else if(payees.msg === 'token is not valid'){
                        history.push('/')
                        console.log('Your token has expired, please log in once more')
                    }else{
                        const clients = res.data;
                        console.log(clients);
                        const count = clients.length;
                        console.log(count);
                        setPayeeCount(count);
                        setPayees(clients);
                    }
                })

            }
        }
    }





    const amountTodayLoadout = () =>{
        if(!agent || !token ||!agent && !token || agent && !token || !agent && token){
            history.push('/');
            swal("Please Log In", "You were logged out because your token expired", "error");
        }else{
            const {id, name, phone, level, see} = agent;
            console.log(`${id}, ${name}, ${phone}, ${level}, ${see}`);
            const date = moment().format("YYYY-MM-DD");
            console.log(date);
            const options={
                params:{
                    id,
                    date
                },

                headers:{
                    'x-auth-token':token
                }
            }
            axios.get('https://erims-api.onrender.com/api/payments/daily', options)
            .then(res =>{
                const transactions = res.data;
                if(!res){
                    alert('there was a problem with your request')
                }else if(transactions.msg === 'token is not valid'){
                    history.push('/')
                    console.log('Your token is expired, please log in once more')
                }else{
                    const dailytrans = res.data;
                    console.log(dailytrans);
                    const count = dailytrans.length;
                    const amountList = dailytrans.map(a => Number(a.amount));
                    const amountRaw = amountList.reduce((a, b) => a + b, 0);
                    const amount = amountRaw.toFixed(2)
                    console.log(amount);
                    console.log(count);
                    setAptCount(count);
                    setApt(dailytrans);
                    setAptAmount(amount)

                }
            })
        }
    }




    const amountToMonthLoadout = () =>{
        if(!agent || !token ||!agent && !token || agent && !token || !agent && token){
            history.push('/');
            swal("Please Log In", "You were logged out because your token expired", "error");
        }else{
            const {id, name, phone, level, see} = agent;
            console.log(`${id}, ${name}, ${phone}, ${level}, ${see}`);
            const options={
                headers:{
                    'x-auth-token':token
                },
                params:{
                    id
                }
            }
            axios.get('https://erims-api.onrender.com/api/payments/monthly', options)
            .then(res => {
                const mtrevenue = res.data;
                if(!res){
                    alert('there was a problem with your request')
                }else if(mtrevenue.msg === 'token is not valid'){
                    history.push('/')
                    console.log('Your token is expired, please log in once more')
                }else{
                    console.log(mtrevenue);
                    const count = mtrevenue.length;
                    const amountList = mtrevenue.map(a => Number(a.amount))
                    const amountRaw = amountList.reduce((a, b) => a + b, 0);
                    const amount = amountRaw.toFixed(2);
                    console.log(amount);
                    console.log(count);
                    setApmCount(count);
                    setApm(mtrevenue);
                    setApmAmount(amount)

                }
            })
        }
    }





    const amountToYearLoadout = () =>{
        if(!agent || !token ||!agent && !token || agent && !token || !agent && token){
            history.push('/');
            swal("Please Log In", "You were logged out because your token expired", "error");
        }else{
            const {id, name, phone, level, see} = agent;
            console.log(`${id}, ${name}, ${phone}, ${level}, ${see}`);
            const options={
                headers:{
                    'x-auth-token':token
                },
                params:{
                    id
                }
            }
            axios.get('https://erims-api.onrender.com/api/payments/yearly', options)
            .then(res =>{
                const auth = res.auth;
                const msg = res.message;
                const ytrevenue = res.data;
                if(!res){
                    alert('there was a problem with your request')
                }else if(ytrevenue.msg === 'token is not valid'){
                    history.push('/');
                    console.log('Your token is expired, please log in once more')
                }else{
                    console.log(ytrevenue)
                    const count = ytrevenue.length;
                    const amountList = ytrevenue.map(a => Number(a.amount))
                    const amountRaw = amountList.reduce((a, b) => a + b, 0);
                    const amount = amountRaw.toFixed(2);
                    console.log(amount);
                    console.log(count);
                    setApyCount(count);
                    setApy(ytrevenue);
                    setApyAmount(amount);
                }
            })
        }
    }





    useEffect(() => {
        reveal();
        agentLoadout();
        collectorLoadout();
        payeeLoadout();
        amountTodayLoadout();
        amountToMonthLoadout();
        amountToYearLoadout();
    }, [])


    return (

        !isAuthenticated && (

            <div className="dash_container">
                

                <div className="row components">
                        <div class="jumbotron">
                            <h1 className="profile-badge">{`Hello, ${agentName}`}</h1>                            
                        </div>

                            <div className="row">
                                <div className="col-md-3">
                                    <PayeeUI payeeCount= {payeeCount} payees= {payees} />
                                </div>

                                <div className="col-md-3">
                                    <DailyPaymentsUI aptCount = {aptCount} apt = {apt} aptAmount = {aptAmount} />
                                </div>

                                <div className="col-md-3">
                                    <MonthlyPaymentsUI apm= {apm} apmCount= {apmCount} apmAmount = {apmAmount}/>
                                </div>

                                <div className="col-md-3">
                                    <YearlyPaymentsUI apy= {apy} apyCount= {apyCount} apyAmount = {apyAmount}/>
                                </div>
                            </div>



                            <div className="row">
                                {
                                    isSuper && (
                                    <div className="col-md-4">
                                    <div className="row gap"></div>
                                        <AgentsUI collectors = {collectors} collectorNumber={collectorNumber}/>
                                     </div>
                                    )
                                }
                                
                         
                                <div className="col-md-4">

                                    <div className="row gap"></div>
                                    
                                    <RevenueTracker payees={payees} payeeCount={payeeCount} apt={apt} aptCount={aptCount} 
                                    aptAmount={aptAmount} apm={apm} apmCount={apmCount} apmAmount={apmAmount} apy={apy} 
                                    apyCount={apyCount} apyAmount={apyAmount} collectors = {collectors} collectorNumber={collectorNumber}/>
                                    <h4></h4>
                                </div>

                           
                                <div className="col-md-4">

                                    <div className="row gap"></div>

                                    <GrowthTracker payees={payees} payeeCount={payeeCount} apt={apt} aptCount={aptCount} 
                                    aptAmount={aptAmount} apm={apm} apmCount={apmCount} apmAmount={apmAmount} apy={apy} 
                                    apyCount={apyCount} apyAmount={apyAmount} collectors = {collectors} collectorNumber={collectorNumber}/>
                                    <h4></h4>
                                </div>
                            </div>




                            <div className="row">
                                <div className="col-md-4">
                                    <AgentPerfromanceChart payees={payees} payeeCount={payeeCount} apt={apt} aptCount={aptCount} 
                                    aptAmount={aptAmount} apm={apm} apmCount={apmCount} apmAmount={apmAmount} apy={apy} 
                                    apyCount={apyCount} apyAmount={apyAmount} collectors = {collectors} collectorNumber={collectorNumber}/>
                                    
                                </div>
                            </div>
                            
                </div> 
            </div>

        )
    )
}

export default Dashboard
