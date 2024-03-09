import React, { useEffect, useState } from 'react';
import { getAccessToken } from '../../utils/commonMethods';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "./index.css";

function ViewUsers(props) {
  let navigate = useNavigate();
  const [userList, setUserList] = useState([]);

  const fetchUserList = async () => {
    try {
      let response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/users`, {
        headers: {
          'Authorization': getAccessToken()
        }
      });

      const { success, users } = response.data;

      if(success) {
        setUserList(users);
      }
    } catch(err) {
      console.log("Error - while fetching user list", err);
    };
  }

  useEffect(() => {
    fetchUserList();
  }, []);
  return (
    <div className="container">
      <h1>View Users</h1>

      <div className="listing">
        {
          userList?.length > 0 ? (
            <>
              {
                userList?.map((user, index) => (
                  <div key={user?.id} className="users">
                    <p className="sr-no">{`${index}.`}</p>
                    <p className="col">{user?.fullname}</p>
                    <p className="col">{user?.email}</p>
                    <div className="func-ico col">
                      <FaEdit className="edit ico" onClick={() => navigate("/edit-user", {state: {userId: user?.id}})} />
                      <MdDelete className="delete ico" />
                    </div>
                  </div>
                ))
              }
            </>
          ) : <p>{`No users have signed up yet.`}</p>
        }
      </div>
    </div>
  );
}

export default ViewUsers;