import React from 'react';
import './styles/Header.css';
import { NavLink } from 'react-router-dom';
import { IoDiamond } from "react-icons/io5";

const Header = () => {
  return (
    <div className='navbar'>
        <div className='logo'>
            <h1>CryptoWare<IoDiamond /> </h1>
        </div>
       <ul>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/coins'>Coins</NavLink></li>
       </ul>
    </div>
  );
}

export default Header;
