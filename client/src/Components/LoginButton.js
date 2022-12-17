import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import '../Styles/Home.css';


const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (
        !isAuthenticated && (
            <button className="sleek" onClick = {()=> loginWithRedirect()}>
                Login
            </button> 
        )
       
    )
}

export default LoginButton
