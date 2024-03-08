import React, { useEffect, useState } from 'react';
import { Document, Page }  from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { IoArrowBackSharp } from "react-icons/io5";
import "./index.css";
import "../GenerateReport/spinner.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();


function blobToURL(blob) {
  return new Promise((resolve) => {
     const reader = new FileReader();
     reader.readAsDataURL(blob);
     reader.onloadend = function () {
        const base64data = reader.result;
        resolve(base64data);
     };
  });
}

function ViewReport({ id, reportFile }) {
  let location = useLocation();
  let navigate = useNavigate();
  let pdfFileUrl = location.state?.reportFile;
  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfFile, setPdfFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const onDocumentLoadSuccess = (event) => {
    const { numPages } = event;
    setNumPages(numPages);
    
    setIsLoading(false)
  };

  const setPdfUrl = async () => {
    const arrayBuffer = await fetch(pdfFileUrl);
    const blob = await arrayBuffer.blob();
    const url = await blobToURL(blob);

    setPdfFile(url);
  }

  useEffect(() => {
    setPdfUrl();
  }, []);
  
  return (
    <div className='main-view-container'>
      {
        isLoading ? (
          <div className="spinner-container">
            <div className="loading-spinner">
            </div>
          </div>
        ) : null
      }
      <div className="back-ico-container">
        <NavLink to={"/"}><IoArrowBackSharp className="back-arrow" /></NavLink>
      </div>
      <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess} noData={"No PDF file specified"}>
        <Page width={350} pageNumber={pageNumber}  />
      </Document>

      <div className="other-reports">
        
      </div>
    </div>
  );
}

export default ViewReport;