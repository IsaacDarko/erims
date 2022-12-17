import React from 'react';
import { scaleRotate as Menu } from 'react-burger-menu';
//import '../Styles/Menu.css';

class Navigate extends React.Component {
    showSettings (event) {
      event.preventDefault();
    }
  
    render () {
      return (
        <Menu>
                <a id="home" className="menu-item" href="/">Home</a>
                <a id="about" className="menu-item" href="/register">Register A Payee</a>
                <a id="contact" className="menu-item" href="/transactions">Initiate A Transaction</a>
           
        </Menu>
      );
    }
  }

  export default Navigate;