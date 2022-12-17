import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../Styles/Home.css';



const TransactionFormButton = () => {
    const [isAuthenticated, setIsAuthenticated ] = useState(false);
    const history = useNavigate();

    const fire = () =>{
        history.push("/payment-table");
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token) setIsAuthenticated(true)
    }, []);


    return (
        !isAuthenticated && (
            <button className="sleek" onClick = {fire}>
                Payments
            </button>
        )
    )
}

export default TransactionFormButton