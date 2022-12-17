import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../Styles/Home.css';



const MainFormButton = () => {
    const [isAuthenticated, setIsAuthenticated ] = useState(false);
    const history = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token) setIsAuthenticated(true)
    }, []);
    
    const fire = () =>{
        history.push("/payee-table");
    }    


    return (
        !isAuthenticated && (
            <button className="sleek" onClick = {fire}>
                Tax Payee Records
            </button>
        )
    )
}

export default MainFormButton