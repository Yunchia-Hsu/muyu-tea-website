import Navbar from '../components/Navbar'
import '../styles/global.css'
import '../components/Header.css';
import { Link, useNavigate } from "react-router-dom"
import PageLayout from '../layouts/PageLayout';
import React from 'react';
import './login.css'
import Header from '../components/Header'

export default function Login() {
  const navigate = useNavigate();

  return (
    <PageLayout>
    <Header /> 
    <div className = "login-wrapper">
      <div className = "login-panel">
          <h2>Please sign up!</h2>
          <div className="input-group">
           
            <input placeholder="User name"/>
            <input placeholder="Email" />
            <input placeholder="Password" />
            <input placeholder="Comfirm Password" />
            <button className="submit-button">SUBMIT</button>
          </div>
          <div className="action-button">
              {/* <button className="action-button-signup">Sign up</button>  */}
              <h3>Already have an account?</h3>

                <button className="action-button-login" onClick={() => navigate('/loginin')}>Log in</button>

          <div/>
        </div>
      </div>
    </div>
    </PageLayout>
  )
}