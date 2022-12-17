import React from 'react';
import { Card, Button } from "reactstrap";




const PayeeUI = (props) => {
    const { payeeCount } = props;
    console.log(payeeCount);
    
    return (
        <div className="card bg-light spacer border-dark mb-3">
            <div className="card-body">
                <p className="card-title">Registered Tax Payers</p>
                
                <div className="card-subtitle mb-2 text-muted">
                    <a href="/payee-table"><h2>{payeeCount}</h2></a>
                </div>
                <p>Registered Users</p>
            </div>
        </div>

    )
}

export default PayeeUI
