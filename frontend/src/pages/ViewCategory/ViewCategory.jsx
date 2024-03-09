import React, { useEffect, useState } from 'react';
import { getAccessToken } from '../../utils/commonMethods';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import "./index.css";

function ViewCategory(props) {
  let navigate = useNavigate();
  const [categoryList, setCategoryList] = useState([]);

  const fetchCategoryList = async () => {
    try {
      let response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/reports/category`, {
        headers: {
          'Authorization': getAccessToken()
        }
      });

      const { success, categories } = response.data;

      if(success) {
        setCategoryList(categories);
      }
    } catch(err) {
      console.log("Error - while fetching category list", err);
    };
  }

  useEffect(() => {
    fetchCategoryList();
  }, []);
  return (
    <div className="container">
      <div className="top-title-container">
        <h1>View Categories</h1>
        <IoMdAdd className="add-ico" onClick={() => navigate("/add-category")} />
      </div>

      <div className="listing">
        {
          categoryList?.length > 0 ? (
            <>
              {
                categoryList?.map((category, index) => (
                  <div key={category?.id} className="users">
                    <p className="sr-no">{`${index}.`}</p>
                    <p className="col">{category?.name}</p>
                  </div>
                ))
              }
            </>
          ) : <p>{`No categories have been created yet.`}</p>
        }
      </div>
    </div>
  );
}

export default ViewCategory;