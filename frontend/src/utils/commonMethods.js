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

export { getAccessToken, isLoggedIn, getLoggedInUser };