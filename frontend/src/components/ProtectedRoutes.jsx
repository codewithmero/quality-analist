import React from 'react';
import { isAdmin, isLoggedIn } from '../utils/commonMethods';
import { Navigate   } from 'react-router-dom';

function ProtectedRoutes({component: Component, admin}) {

  let isAdminAccessRequired = false;

  if(typeof admin !== "undefined") {
    isAdminAccessRequired = admin;
  }

  if(isAdminAccessRequired && isLoggedIn() && !isAdmin()) {
    return (
      <Navigate to="/" />
    )
  }
  
  return (
    isLoggedIn() ? <Component /> : <Navigate to="/login" />
  )
}

export default ProtectedRoutes;