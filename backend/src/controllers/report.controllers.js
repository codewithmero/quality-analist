import Category from "../models/category.model.js";
import Report from "../models/report.model.js";
import { Op } from "sequelize";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { 
  formatToJSON,
  generateRandomContractNumber, 
  generateRandomTemplateId, 
  generateReportPDF 
} from "../utils/commonMethods.js";
import fs from 'fs';
import moment from 'moment';


const getAllReports = asyncHandler(async (req, res) => {

  let reports = formatToJSON(await Report.findAll({
    attributes: [
      'id', 
      'reportFile', 
      'reportName', 
      'itemName', 
      'contractorName', 
      'createdAt', 
      'inspectionStatus'
    ],
  }));

  if(!reports) {
    throw new Error("Unable to fetch reports. Some error occured!");
  }

  reports = reports?.map(item => ({
    ...item,
    createdAt: moment(item?.createdAt).format('MMMM Do YYYY, h:mm:ss a')
  }));

  return res.status(200)?.json({
    success: true,
    reports,
    msg: "All reports have been fetched successfully."
  });
});

const createNewReport = asyncHandler(async (req, res) => {

  fs.renameSync(req.file.path, "public/img/quality.jpg");
  let localUploadedImgPath = "public/img/quality.jpg";

  // UPLOADING THE IMAGE ON CLOUDINARY;
  let uploadedImgResponse = await uploadOnCloudinary(localUploadedImgPath);

  let photo = uploadedImgResponse?.url || uploadedImgResponse?.secure_url;

  const { 
    reportName,
    organization,
    itemName,
    qualityInspectorName,
    contractorName,
    inspectionStatus,
    generalRemarks,
    reportCategory
  } = req.body;

  let projectName="Commodity Digital Quality Control Report (QC)";
  let templateId = generateRandomTemplateId();
  let templateVersion = 1;
  let formVersion = 6;
  let inspectionNumber = generateRandomContractNumber();
  let contractNumber = generateRandomContractNumber();

  let reportObj = {
    reportName,
    organization,
    itemName,
    inspectionNumber,
    qualityInspectorName,
    contractNumber,
    contractorName,
    generalRemarks,
    projectName,
    photo,
    templateId,
    templateVersion,
    formVersion,
    contractNumber,
    reportCategory,
    inspectionStatus
  }

  let newReport = JSON.parse(JSON.stringify(await Report.create(reportObj)));

  if(!newReport) {
    throw new Error("Unable to create report. Some error occured!");
  }

  // GENERATING REPORT AS PDF;
  let pdfDataObj = {
    reportName: newReport?.reportName,
    itemName: newReport?.itemName,
    inspectionNumber: newReport?.inspectionNumber,
    contractNumber: newReport?.contractNumber,
    qualityInspectorName: newReport?.qualityInspectorName,
    contractorName: newReport?.contractorName,
    generalRemarks: newReport?.generalRemarks,
    projectName: newReport?.projectName,
    templateId: newReport?.templateId,
    templateVersion: newReport?.templateVersion,
    formVersion: newReport?.formVersion,
    organization: newReport?.organization,
    inspectionStatus: newReport?.inspectionStatus,
    photo: localUploadedImgPath,
    reportGeneratedAt: moment(newReport?.createdAt).format('MMMM Do YYYY, h:mm:ss a')
  }
  
  let pdfBytes = await generateReportPDF(pdfDataObj);
  fs.writeFileSync('public/reports/report.pdf', pdfBytes);

  // UPLOADING PDF ON CLOUDINARY AND SAVING THE PATH IN DB;
  // FOR LATER USE;
  let localPdfPath = "public/reports/report.pdf";
  let uploadedReportResponse = await uploadOnCloudinary(localPdfPath);
  console.log("Uploaded report response:", uploadedReportResponse);
  
  let report = uploadedReportResponse?.url || uploadedReportResponse?.secure_url;

  await Report.update({
    reportFile: report
  }, {
    where: {
      id: newReport?.id
    }
  })

  // DELETING THE LOCAL FILES
  fs.unlinkSync(localPdfPath);
  fs.unlinkSync(localUploadedImgPath);

  let updatedReport = JSON.parse(JSON.stringify(await Report.findOne({
    where: {
      id: newReport?.id
    },
    attributes: [
      'id',
      'reportFile'
    ]
  })));

  return res.status(201)?.json({
    success: true,
    report: updatedReport,
    msg: "A new report has been generate successfully."
  });
});

const getAllReportsByUserId = asyncHandler(async(req, res) => {

  // (JOIN) RULES;
  Category.hasMany(Report, { foreignKey: 'reportCategory' });
  Report.belongsTo(Category, {foreignKey: "reportCategory"});

  let categoryReportData = formatToJSON(await Category.findAll({
    attributes: [
      "name"
    ],
    include:[
      {
        model: Report,
        attributes: [
          'id', 
          'reportFile', 
          'reportName', 
          'itemName', 
          'contractorName', 
          'createdAt', 
          'inspectionStatus'
        ],
      }
    ]
  }))

  let reports = categoryReportData?.map(item => {
    let formattedReports = item?.reports?.map(report => ({
      ...report,
      createdAt: moment(report?.createdAt).format('MMMM Do YYYY, h:mm:ss a') 
    }))
    return {
      ...item,
      reports: formattedReports?.slice(0, 4)
    }
  })?.filter(item => item?.reports?.length > 0);

  return res.status(200)?.json({
    success: true,
    reports,
    msg: "All reports have been fetched successfully."
  });
});

const getReportsBySearchTerm = asyncHandler(async (req, res) => {
  const { searchTerm } = req.params;
  let reports = formatToJSON(await Report.findAll({
    where: {
      [Op.or]: [
        { reportName: { [Op.like]: `%${searchTerm}%` } },
        { qualityInspectorName: { [Op.like]: `%${searchTerm}%` } },
        { projectName: { [Op.like]: `%${searchTerm}%` } },
        { itemName: { [Op.like]: `%${searchTerm}%` } },
      ],
    },
    attributes: [
      'id', 
      'reportFile', 
      'projectName',
      'reportName', 
      'itemName', 
      'contractorName', 
      'createdAt', 
      'qualityInspectorName',
      'inspectionStatus'
    ],
  }));

  if(!reports) {
    throw new Error("Unable to fetch reports. Some error occured!");
  }

  reports = reports?.map(item => ({
    ...item,
    createdAt: moment(item?.createdAt).format('MMMM Do YYYY, h:mm:ss a')
  }));

  return res.status(200)?.json({
    success: true,
    reports,
    msg: "All reports have been fetched successfully."
  });
});

export {
  getAllReports,
  createNewReport,
  getAllReportsByUserId,
  getReportsBySearchTerm,
}