import React from 'react';
import { Card, Button } from "reactstrap";

 
const YearlyPaymentsUI = (props) => {
    const {apy, apyCount, apyAmount} = props;

    return (
        <div className="card spacer bg-light border-dark mb-3">
            <div className="card-body">
                <p className="card-title">Revenue Collected This Year</p>
                
                <div className="card-subtitle mb-2 text-muted">
                    <a href="/payment-table"><h2>GH₵{apyAmount}</h2></a>
                </div>
                <p>Recorded from {apyCount} Transactions</p>
            </div>
        </div>
    )
}

export default YearlyPaymentsUI;
