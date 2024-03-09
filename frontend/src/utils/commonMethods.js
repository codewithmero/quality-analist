const getAccessToken = () => {
  let token = null;
  if(typeof window !== "undefined") {
    token = localStorage.getItem('access_token');
  }

  return token;
}


const isLoggedIn = () => {
  let isLoggedIn = false;

  if(typeof window !== "undefined") {
    let loggedInVal = localStorage.getItem('is_logged_in');

    if(loggedInVal === true || loggedInVal === "true") {
      isLoggedIn = true;
    }
  }

  return isLoggedIn;
}

const getLoggedInUser = () => {
  let userDetails = null;

  if(typeof window !== "undefined") {
    userDetails = JSON.parse(localStorage.getItem('user'));
  }

  return userDetails;
}

const isAdmin = () => {
  let isAdmin = false;

  if(typeof window !== "undefined") {
    let adminVal = localStorage.getItem('is_admin');

    if(adminVal === true || adminVal === "true") {
      isAdmin = true;
    }
  }

  return isAdmin;
}

export { 
  getAccessToken, 
  isLoggedIn, 
  getLoggedInUser, 
  isAdmin 
};