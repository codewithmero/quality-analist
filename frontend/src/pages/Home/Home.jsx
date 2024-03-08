import React, { useEffect, useState } from 'react';
import ReportCard from '../../components/ReportCard/ReportCard';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
import axios from 'axios';
import { FaSearch } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import "./index.css";

function Home(props) {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [isServerAvailable, setIsServerAvailable] = useState(true);

  const fetchHomeData = async () => {
    try {
      let response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/reports/home/1`);
      const { success, reports: reportsList } = response?.data;
      
      if(success) {
        setIsServerAvailable(true);
        setReports(reportsList);
        localStorage.setItem('reports', JSON.stringify(reportsList));
      }
    } catch(err) {
      setIsServerAvailable(false);
      console.log("Error - while fetching homepage data", err);
      let cachedReports = JSON.parse(localStorage.getItem("reports"));
      setReports(cachedReports);
    }
  }

  useEffect(() => {
    fetchHomeData();
  }, []);

  return (
    <div className="container" style={{position: 'relative'}}>
      {
        !isServerAvailable ? (
          <p className="warning-no-internet">Not connected with internet!</p>
        ) : null
      }

      <div className="top-column-bar">
        <h1>Welcome, Rudra</h1>
        <NavLink to="/search-reports"><FaSearch className="home search-ico" /></NavLink>
      </div>

      <div className="home-report-container">
        {
          reports?.length > 0 ? (
            <>
              {
                reports?.map((item, index) => (
                  <div className="home-section">
                    <h2><FaArrowRightLong className="category-pointer" />{item?.name}</h2>
                    <div className="section-listing">
                    {
                      item?.reports?.map(report => (
                        <ReportCard
                          item={report}
                          key={index}
                          navigate={navigate} />
                      ))
                    }
                    </div>
                  </div>
                ))
              }
            </>
          ) : (
            <div className="no-report-warning">
              <p>{`No reports have been generated yet.`}</p>
              <button onClick={() => navigate("/generate-report")}>Generate Now +</button>
            </div>
          )
        }
      </div>

      {
        reports?.length > 0 ? (
          <button className="generate-report-btn" onClick={() => navigate("/generate-report")}>
            <IoMdAdd className="home add-ico" />
          </button>
        ) : null
      }
    </div>
  );
}

export default Home;