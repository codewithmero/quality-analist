import React from 'react';
import "./index.css";

function ReportCard({ item, key, navigate }) {
  return (
    <div className="report-card"
      key={key} 
      onClick={() => navigate("/view-report", {state: {id: item?.id, reportFile: item?.reportFile}})}>
      <div className="report-icon">
        <img src={`https://cdn-icons-png.flaticon.com/512/337/337946.png`} width={'50px'} height={'auto'} alt={'pdf Ico'} />
      </div>
      <h3 className="report-name">{item?.reportName}</h3>
      <p className={`status ${item?.inspectionStatus ? "approved" : "rejected"}`}>{item?.inspectionStatus ? "Approved" : "Rejected"}</p>
      <p className="item-name">{item?.itemName}</p>
      <p className="contractor-name">{item?.contractorName}</p>
      <p className="report-date">{item?.createdAt}</p>
    </div>
  );
}

export default ReportCard;