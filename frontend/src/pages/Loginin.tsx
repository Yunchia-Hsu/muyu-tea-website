import Navbar from '../components/Navbar'
import '../styles/global.css'
import '../components/Header.css';
import { useNavigate } from "react-router-dom"
import PageLayout from '../layouts/PageLayout';

import './login.css'
import Header from '../components/Header'

export default function Login() {
  const navigate = useNavigate();
  return (
    <PageLayout>
    <Header /> 
    <div className = "login-wrapper">
      <div className = "login-panel">
          <h2>Please log in!</h2>
          <div className="input-group">
           
           
            <input placeholder="Email" />
            <input placeholder="Password" />
           
            <button className="submit-button">SUBMIT</button>
          </div>
          <div className="action-button">
              {/* <button className="action-button-signup">Sign up</button>  */}
              <h3>Want to sign up?</h3>
              <button className="action-button-login"  onClick={() => navigate('/login')}>Sign up</button>
          <div/>
        </div>
      </div>
    </div>
    </PageLayout>
  )
}