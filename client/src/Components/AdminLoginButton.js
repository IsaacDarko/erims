import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Home.css';


const AdminLoginButton = () => {
    const history = useNavigate(); 
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) setIsAuthenticated(true)
    }, []);

    const authAdmin = () =>{
        history.push("/admin-login")
    }

    return (
        !isAuthenticated && (
            <button className="sleek" onClick = {()=> authAdmin()}>
                Admin Login
            </button> 
        )
       
    )
}

export default AdminLoginButton
