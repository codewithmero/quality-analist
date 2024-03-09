import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { usePhoneCamera } from '../../hooks/usePhoneCamera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { FaCamera } from "react-icons/fa6";
import { RiDeleteBin7Fill } from "react-icons/ri";
import Select from 'react-select';
import "./index.css";
import { getAccessToken } from '../../utils/commonMethods';
// import "./spinner.css";

const verifyOptions = [
  { value: true, label: 'Yes, the item is upto the mark.' },
  { value: false, label: 'No, the item has fault' }
]

function GenerateReport(props) {
  defineCustomElements(window);
  const navigate = useNavigate();
  const { photos, setPhotos, takePhoto } = usePhoneCamera();
  const [selectedPhoto, setSelectedPhoto] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState({});
  // const [newlyGenerateReport, setNewlyGeneratedReport] = useState(null);
  
  const handlePhotoCapture = (event) => {
    event.preventDefault();
    takePhoto()
      .then(() => {
        console.log(photos?.[0]?.filepath);
        setSelectedPhoto(photos?.[0]?.filepath);
      });
  }

  const getBlob = fileUri => { 
    return fetch(fileUri)
            .then( response => { 
              return response.blob(); 
            }, error => { 
              console.log(error); 
            }); 
          };

  const handleGenerateReport = async () => {
    try {
      // APPENDING PAYLOAD TO SEND IT OVER TO THE SERVER;
      let payload = new FormData();
      let file = await getBlob(photos?.[0]?.webviewPath);
      payload?.append("report-img", file);
      Object.keys(report)?.forEach(key => {
        payload.append(key, report?.[key]);
      })

      let response = await axios.post(`http://localhost:8000/api/v1/reports`, payload, {
        headers: {
          'Authorization': getAccessToken()
        }
      });
      const { success, report: newReport } = response?.data;
      if(success) {
        setPhotos([]);
        // setNewlyGeneratedReport(newReport);
        setIsLoading(false);
        navigate("/view-report", {
          state: {
            id: newReport?.id,
            reportFile: newReport?.reportFile,
            viewReport: true
          }
        })
      }
    } catch(err) {
      console.log("Err - Error while generating report:::", err);
      setIsLoading(false);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    handleGenerateReport();
    // console.log("Report:::", report);
  }

  const handleClearPhotos = (event) => { 
    event.preventDefault(); 
    setPhotos([]); 
    setSelectedPhoto("")
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setReport(d => ({
      ...d,
      [name]: value
    }));
  }

  const fetchCategoryList = async () => {
    try {
      let response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/reports/category`, {
        headers: {
          'Authorization': getAccessToken()
        }
      });
      const { success, categories: categoryList } = response?.data;

      if(success) {
        let formattedCategory = categoryList.map(c => ({
          label: c.name,
          value: c.id
        }));
        setCategories(formattedCategory);
      }
    } catch(err) {
      console.log("ERROR - while fetching ctaegory list", err);
      setCategories([]);
    }
  }

  useEffect(() => {
    fetchCategoryList();
  }, []);

  console.log("Report:::", report);
  return (
    <div style={{ position: 'relative' }}>
      {
        isLoading ? (
          <div className="spinner-container">
            <div className="loading-spinner">
            </div>
          </div>
        ) : null
      }
      
      <div className="top-column-bar">
        <h1>New Report</h1>
        <button onClick={() => navigate("/")}>View Reports</button>
      </div>

      <form className="form">
        <div className="form-group">
            <label htmlFor="report-name">Report Name:</label>
            <br />
            <input type="text" placeholder="Enter the item name" name="reportName" onChange={handleChange} />
        </div>

        <div className="form-group">
            <label htmlFor="item-name">Item Name:</label>
            <br />
            <input type="text" placeholder="Enter the item name" name="itemName" onChange={handleChange} />
        </div>
        
        <div className="form-group">
            <label htmlFor="organization">Organization:</label>
            <br />
            <input type="text" placeholder="Enter the item name" name="organization" onChange={handleChange} />
        </div>
        
        <div className="form-group">
            <label htmlFor="contractor-name">Contractor Name:</label>
            <br />
            <input type="text" placeholder="Enter the item name" name="contractorName" onChange={handleChange} />
        </div>
        
        <div className="form-group">
            <label htmlFor="status">Report Category:</label>
            <br />
            <Select 
              options={categories}
              onChange={(e) => handleChange({target: {name: "reportCategory", value: e?.value}})}
              styles={{
                control: (styles) => ({
                  ...styles,
                  height: "30px",
                  fontSize: "1rem",
                  backgroundColor: "#eee",
                  borderRadius: "4px",
                  outline: 0,
                  border: 0
                }),
              }} />
        </div>
        
        <div className="form-group">
            <label htmlFor="status">Choose Status:</label>
            <br />
            <Select 
              options={verifyOptions}
              onChange={(e) => handleChange({target: {name: "inspectionStatus", value: e?.value}})}
              styles={{
                control: (styles) => ({
                  ...styles,
                  height: "30px",
                  fontSize: "1rem",
                  backgroundColor: "#eee",
                  borderRadius: "4px",
                  outline: 0,
                  border: 0
                }),
              }} />
        </div>


        <div className="form-group">
          <label htmlFor="image">Capture Image:</label>
          <br />
          <div className="file-upload">
            <input type="text" disabled={true} value={selectedPhoto || photos?.[0]?.filepath} />
            <button onClick={handlePhotoCapture}><FaCamera className="file-ico" /></button>
          </div>
          <button onClick={handleClearPhotos} className="clear-btn"><RiDeleteBin7Fill className="clear-ico"/></button>
        </div>

        <div className="form-group">
          <label htmlFor="general-remarks">General Remarks:</label>
          <br />
          <textarea rows={10} name="generalRemarks" onChange={handleChange} />
        </div>

        <button type="submit" className="submit-btn" disabled={isLoading} onClick={handleSubmit}>Generate</button>
      </form>
    </div>
  )
}

export default GenerateReport;