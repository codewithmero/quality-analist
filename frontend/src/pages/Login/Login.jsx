import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./index.css";

function Login(props) {
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setLoginDetails(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  const loginUser = async () => {

    try {
      let response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/users/login`, loginDetails);

      const { success, user, accessToken } = response?.data;
      if(success) {
        // IF THE LOGIN IS SUCCESSFUL, WE WOULD MOVE ONTO THE HOMEPAGE
        // AND SAVE THE ACCESS TOKEN IN LOCALSTORAGE TO MAKE SECURE REQUESTS;
        localStorage.setItem('access_token', `Bearer ${accessToken}`);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('is_logged_in', true);
        localStorage.setItem('is_admin', user?.isAdmin);
        
        navigate("/");
      }
    } catch(err) {
      console.log("Error - while signing up", err);
    }
  }

  const handleLogin = (event) => {
    event.preventDefault();

    loginUser();
  }

  return (
    <div className="container">
      <h1>Login Here,</h1>
      <form>
        <div className="form-group">
          <label labelFor="email">Email</label>
          <br />
          <input type="email" name="email" className="form-input" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label labelFor="email">Password</label>
          <br />
          <input type="password" name="password" className="form-input" onChange={handleChange} />
        </div>

        <button className="login-btn" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
}

export default Login;