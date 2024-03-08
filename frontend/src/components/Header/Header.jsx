import React from 'react';
import { NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import "./index.css";

function Header(props) {

  const handleOpenNavigation  = () => {
    const navigation = document.querySelector("header > .navbar");
    const openNav = document.querySelector(".open-navigation");
    openNav.style.display = "none";
    navigation.style.display = "flex";
  }

  const handleCloseNavigation = () => {
    const navigation = document.querySelector("header > .navbar");
    const openNav = document.querySelector(".open-navigation");
    openNav.style.display = "block";
    navigation.style.display = "none";
  }

  const handleLinkClick = () => {
    const navigation = document.querySelector("header > .navbar");
    const openNav = document.querySelector(".open-navigation");
    openNav.style.display = "block";
    navigation.style.display = "none";
  }

  return (
    <header>
      <h2 className="logo"><NavLink to="/">Logo</NavLink></h2>
      <nav className="navbar">
        <ul>
          <li className="nav-link"><NavLink to={`/`} className={({isActive}) => `${isActive ? "active" : ""}`} onClick={() => handleLinkClick()}>Home</NavLink></li>
          <li className="nav-link"><NavLink to={`/search-reports`} className={({isActive}) => `${isActive ? "active" : ""}`} onClick={() => handleLinkClick()}>Search Report</NavLink></li>
          <li className="nav-link"><NavLink to={`/generate-report`} className={({isActive}) => `${isActive ? "active" : ""}`} onClick={() => handleLinkClick()}>Generate Report</NavLink></li>
        </ul>
        <IoCloseSharp className="close-navigation" onClick={() => handleCloseNavigation()} />
      </nav>
      <GiHamburgerMenu className="open-navigation" onClick={() => handleOpenNavigation()} />
    </header>
  );
}

export default Header;