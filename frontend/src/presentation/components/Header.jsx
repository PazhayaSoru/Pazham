import React from "react";
import "./Header.css";
import ATag from "./ATags/A-tags";
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../infrastructure/actions/authActions';


const Header = () => {
  const dispatch = useDispatch();
  const logged = useSelector((state) => state.auth.logged);

  return (
    <div className="header-container">
    <header className="header">
      <div className="logo"><span className="p-in-pazham">P</span>azham<span className="dot"></span></div>
      <nav className="nav">
       <ATag href="/" text="Home"/>
       <ATag href="#" text="Contact"/>
       <ATag href="#" text="About"/>
      </nav>
      <div>
      {!logged && (
  <>
    <a className='a-button' href='/login'><button className="cta-button primary">Login</button></a>
    <a className='a-button' href='/signup'><button className="cta-button secondary">Sign Up</button></a>
  </>
)}
      {logged && (
  <>
    <a className='a-button' href='/'><button className="cta-button primary">LogOut</button></a>
  </>
)}
      </div>
    </header>
    <div className="header-border"></div>
    </div>
  );
};

export default Header;


