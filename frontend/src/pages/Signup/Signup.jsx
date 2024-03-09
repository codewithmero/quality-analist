import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./index.css";

function Signup(props) {
  const navigate = useNavigate();
  const [signupDetails, setSignupDetails] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSignupDetails(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  const createNewUser = async () => {

    try {
      let response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/users`, signupDetails);

      const { success, accessToken } = response?.data;
      if(success) {
        // IF THE IGNUP IS SUCCESSFUL, WE WOULD MOVE ONTO THE HOMEPAGE
        // AND SAVE THE ACCESS TOKEN IN LOCALSTORAGE TO MAKE SECURE REQUESTS;
        localStorage.setItem('access_token', `Bearer ${accessToken}`);
        localStorage.setItem('is_logged_in', true);
        navigate("/");
      }
    } catch(err) {
      console.log("Error - while signing up", err);
    }
  }

  const handleSignup = (event) => {
    event.preventDefault();

    createNewUser();
  }

  return (
    <div className="container">
      <h1>Signup Here,</h1>
      <form>
        <div className="form-group">
          <label labelFor="firstname">Firstname</label>
          <br />
          <input type="text" name="firstname" className="form-input" onChange={handleChange} />
        </div>

        <div className="form-group">
          <label labelFor="lastname">Lastname</label>
          <br />
          <input type="text" name="lastname" className="form-input" onChange={handleChange} />
        </div>

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

        <button className="signup-btn" onClick={handleSignup}>Signup</button>
      </form>
    </div>
  );
}

export default Signup;