import React, { Component } from "react";
import { Card, Button } from "reactstrap";

const DailyPaymentsUI =(props) => {
  const {apt, aptCount, aptAmount} = props;
  
    return (
 
      <div className="card spacer bg-light border-dark mb-3" >
            <div className="card-body">
                <p className="card-title">Amount Payed Today</p>
                
                <div className="card-subtitle mb-2 text-muted">
                    <a href="/payment-table"><h2>GH₵{aptAmount}</h2></a>
                </div>
                <p>Recorded from {aptCount} Transactions</p>
            </div>
        </div>
    );
  
}
export default DailyPaymentsUI