import React from 'react';
import { Card, Button } from "reactstrap";
import { useNavigate } from 'react-router';




const AgentsUI = (props) => {
    const { collectors, collectorNumber } = props;
    const history = useNavigate();
    
    if(collectors.msg === 'token is not valid'){
        console.log('your token has expired please login once more');
        history.push('/')
    }else{
        console.log(collectors);
    }
    
    return (
        <div className="card bg-light spacer border-dark mb-3">
            <div className="card-body">
                <p className="card-title">Registered Agents</p>
                
                <div className="card-subtitle mb-2 text-muted">
                    <a href="/agent-table"><h2>{collectorNumber}</h2></a>
                </div>
                <p>Registered Agents on the system</p>
            </div>
        </div>

    )
}

export default AgentsUI
