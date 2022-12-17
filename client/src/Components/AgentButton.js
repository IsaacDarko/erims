import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../Styles/Home.css';



const AgentButton = () => {
    const [isAuthenticated, setIsAuthenticated ] = useState(false);
    const history = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const agent = JSON.parse(localStorage.getItem('agent'));
        if(!agent) {
            history("/");
        }else{
            const {id, full_name, tel_no, level, see} = agent;
            const rank = level;
            console.log(rank)
            if(rank ==='SuperUser'){
                setIsAuthenticated(true)
                console.log('Welcome boss')
            }else if(rank !== 'SuperAgent'){
                console.log('you are just an agent')
            }else{
                console.log('your user-role could not be determined')
            }
        }
        
    }, []);
    
    const fire = () =>{
        history("/agent-table");
    }    


    return (
        isAuthenticated && (
            <button className="sleek" onClick = {fire}>
               Agents Records
            </button>
        )
    )
}

export default AgentButton