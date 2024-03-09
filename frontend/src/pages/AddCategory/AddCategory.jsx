import axios from 'axios';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getAccessToken } from '../../utils/commonMethods';

import { IoArrowBackSharp } from "react-icons/io5";
import "./index.css";

function Signup(props) {
  const navigate = useNavigate();
  const [categoryDetails, setCategoryDetails] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCategoryDetails(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  const createNewCategory = async () => {

    try {
      let response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/reports/category`, categoryDetails, {
        headers: {
          'Authorization': getAccessToken()
        }
      });

      const { success } = response?.data;
      if(success) {
        navigate("/view-categories");
      } 
    } catch(err) {
      console.log("Error - while adding category", err);
    }
  }

  const handleAddCategory = (event) => {
    event.preventDefault();

    createNewCategory();
  }

  return (
    <div className="container">
      <div className="title-col">
        <NavLink to="/view-categories"><IoArrowBackSharp className="back-arrow-ico" /></NavLink>
        <h1>Add New Category,</h1>
      </div>
      <form>
        <div className="form-group">
          <label labelFor="category-name">Category Name</label>
          <br />
          <input type="text" name="name" className="form-input" onChange={handleChange} />
        </div>

        <button className="submit-btn" onClick={handleAddCategory}>Add +</button>
      </form>
    </div>
  );
}

export default Signup;