import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';

import { IoArrowBackSharp } from "react-icons/io5";
import { getAccessToken } from '../../utils/commonMethods';
import "./index.css";

function EditUser(props) {
  let navigate = useNavigate();
  let location = useLocation();
  const { userId } = location?.state;
  const [user, setUser] = useState({});

  const fetchUserDetails = async() => {
    try {
      let response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/users/edit/${userId}`, {
        headers: {
          'Authorization': getAccessToken()
        }
      });

      const { success, user: userDetails } = response.data;
      if(success) {
        setUser(userDetails);
      }
    } catch(err) {
      console.log("Error - while fetching user details", err);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event?.target;
    setUser(u => ({
      ...u,
      [name]: value
    }));
  }

  const updateUserDetails = async () => {
    try {
      let response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/api/v1/users/edit/${userId}`, user, {
        headers: {
          'Authorization': getAccessToken()
        }
      });

      const { success } = response.data;
      if(success) {
        navigate("/view-users");
      }
    } catch(err) {
      console.log("Error - while fetching user details", err);
    }
  }

  const handleEditDetails = (event) => {
    event.preventDefault();

    updateUserDetails();
  }

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="container">
      <div className="title-col">
        <NavLink to="/view-users"><IoArrowBackSharp className="back-arrow-ico" /></NavLink>
        <h1>Edit User</h1>
      </div>

      <form>
        <div className="form-group">
          <label labelFor="firstname">Firstname</label>
          <br />
          <input type="text" name="firstname" className="form-input" value={user?.firstname} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label labelFor="lastname">Lastname</label>
          <br />
          <input type="text" name="lastname" className="form-input" value={user?.lastname} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label labelFor="email">Email</label>
          <br />
          <input type="email" name="email" className="form-input" value={user?.email} onChange={handleChange} />
        </div>

        <button className="submit-btn" onClick={handleEditDetails}>Save Details</button>
      </form>

    </div>
  );
}

export default EditUser;