import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./index.css";
import { FaSearch } from "react-icons/fa";
import ReportCard from '../../components/ReportCard/ReportCard';

function SearchReports(props) {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchReportsBySearchTerm = async () => {
    try {
      let response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/reports/search/${searchTerm}`);
      const { success, reports: reportsData } = response.data;

      if(success) {
        setReports(reportsData);
      }

    } catch (err) {
      console.log("Err - while fetching reports", err);
      setReports([]);
    }
  }

  const handleSearch = (event) => {
    event.preventDefault();

    console.log("search term", searchTerm);
    fetchReportsBySearchTerm();
  }

  return (
    <div className="container">
      <div className="top-column-bar">
        <h1>Search</h1>
        <button onClick={() => navigate("/")}>View Reports</button>
      </div>
      <form className="search-form">
        <input type="text" className="search-report-bar" placeholder="Type Search Text (for eg., report name)" onChange={(e) => setSearchTerm(e.target.value)} />
        <button onClick={handleSearch}><FaSearch className="search-ico" /></button>
      </form>
      <div className="search-items-container">
        {
          reports?.length > 0 ? (
            <>
              {
                reports?.map((item, index) => (
                  <ReportCard
                    item={item}
                    key={index}
                    navigate={navigate} />
                ))
              }
            </>
          ) : <p className="warning-message">{`No reports have been searched yet.`}</p>
        }
      </div>
    </div>
  );
}

export default SearchReports;