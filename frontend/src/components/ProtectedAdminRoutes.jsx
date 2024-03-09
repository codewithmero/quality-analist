import React from 'react';
import { isAdmin, isLoggedIn } from '../utils/commonMethods';
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';

function ProtectedRoutes({ children }) {
  
  if(isLoggedIn() && isAdmin())
    return (
      <>
        {children} 
      </>
    );

  if(isLoggedIn() && !isAdmin())
    return (
      <>
        <Home />
      </>
    )

  return (
    <Login />
  )
}

export default ProtectedRoutes;