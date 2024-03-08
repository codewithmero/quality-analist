import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import fs from 'fs';
import jwt from 'jsonwebtoken';

const MAX_TEMPLATEID_LEN = 10;
const MAX_CONTACT_NO_LEN = 7;

const generateRandomTemplateId = () => {
  let id = "";
  let subsetStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for(let i = 0; i < MAX_TEMPLATEID_LEN; i++) {
    id += subsetStr[Math.floor(Math.random() * subsetStr.length)];
  }

  id = `${id.slice(0, 2)}-${id.slice(2, 6)}-${id.slice(6, 10)}`;
  
  return id;
}

const generateRandomContractNumber = () => {
  let id = "";
  let subsetStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for(let i = 0; i < MAX_CONTACT_NO_LEN; i++) {
    id += subsetStr[Math.floor(Math.random() * subsetStr.length)];
  }

  id = `${id.slice(0, 3)}-${id.slice(3, 7)}`;
  
  return id;
}

const generateReportPDF = async (obj) => {

  // Create a new PDFDocument
  const pdfDoc = await PDFDocument.create()

  // APPROVED IMAGE BUFFER;
  let approvedImageBuffer = fs.readFileSync('public/img/approved.jpg');
  
  // REJECTED IMAGE BUFFER;
  let rejectedImageBuffer = fs.readFileSync('public/img/rejected.jpg');
  
  // // QUALITY CONTROL IMAGE;
  let qualityControlImageBuffer = fs.readFileSync(obj?.photo);
  let qualityControlImg = await pdfDoc.embedPng(qualityControlImageBuffer);
  const jpgDims = qualityControlImg.scale(0.1)

  let jpgImage = null;

  if(obj?.inspectionStatus) {
    jpgImage = await pdfDoc.embedJpg(approvedImageBuffer);
  } else {
    jpgImage = await pdfDoc.embedJpg(rejectedImageBuffer);
  }

  // Embed the Times Roman font
  const HelveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const HelveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Add a page and draw some text on it
  const page = pdfDoc.addPage([320, 500])

  page.drawImage(jpgImage, {
    x: 20,
    y: 438,
    width: 55,
    height: 55,
  })

  // Template ID;
  page.drawText('Template ID:', { x: 230, y: 460, size: 6, font: HelveticaBoldFont })
  page.drawText(obj?.templateId, { x: 270, y: 460, size: 5, font: HelveticaFont })
  
  // Template Version;
  page.drawText('Template Version:', { x: 230, y: 450, size: 6, font: HelveticaBoldFont })
  page.drawText(`${obj?.templateVersion}`, { x: 284, y: 450, size: 5, font: HelveticaFont })
  
  // Form Version;
  page.drawText('Form Version:', { x: 230, y: 440, size: 6, font: HelveticaBoldFont })
  page.drawText(`${obj?.formVersion}`, { x: 273, y: 440, size: 5, font: HelveticaFont })

  // HORIZONTAL FORM LINE;
  page.drawText("=======================================================================================================", { x: 10, y: 430, size: 5, font: HelveticaFont });
  page.drawText(obj?.projectName, { x: 30, y: 400, size: 11, font: HelveticaBoldFont })
  
  // Date;
  page.drawText('Report Generation Date:', { x: 30, y: 360, size: 8, font: HelveticaBoldFont })
  page.drawText(obj?.reportGeneratedAt, { x: 140, y: 360, size: 5, font: HelveticaFont })

  // Project Name;
  page.drawText('Report Name:', { x: 30, y: 340, size: 8, font: HelveticaBoldFont })
  page.drawText(obj?.reportName, { x: 140, y: 340, size: 5, font: HelveticaFont })
  
  // ITEM NAME;
  page.drawText('Item Name:', { x: 30, y: 320, size: 8, font: HelveticaBoldFont })
  page.drawText(obj?.itemName, { x: 140, y: 320, size: 5, font: HelveticaFont })
 
  // ITEM NAME;
  page.drawText('Organization:', { x: 30, y: 300, size: 8, font: HelveticaBoldFont })
  page.drawText(obj?.organization, { x: 140, y: 300, size: 5, font: HelveticaFont })
 
  // CONTRACTOR NUMBER;
  page.drawText('Contract Number:', { x: 30, y: 280, size: 8, font: HelveticaBoldFont })
  page.drawText(obj?.contractNumber, { x: 140, y: 280, size: 5, font: HelveticaFont })

  // CONTRACTOR NAME;
  page.drawText('Contractor Name:', { x: 30, y: 260, size: 8, font: HelveticaBoldFont })
  page.drawText(obj?.contractorName, { x: 140, y: 260, size: 5, font: HelveticaFont })

  // QUALITY INSPECTOR NAME;
  page.drawText('Quality Inspector:', { x: 30, y: 240, size: 8, font: HelveticaBoldFont })
  page.drawText(obj?.qualityInspectorName, { x: 140, y: 240, size: 5, font: HelveticaFont })

  // INSPECTION NUMBER;
  page.drawText('Inspection No:', { x: 30, y: 220, size: 8, font: HelveticaBoldFont })
  page.drawText(obj?.inspectionNumber, { x: 140, y: 220, size: 5, font: HelveticaFont })
  
  // QUALITY STATUS;
  page.drawText('Quality Status:', { x: 30, y: 200, size: 8, font: HelveticaBoldFont })
  page.drawText(obj?.inspectionStatus ? "Approved" : "Rejected", { x: 140, y: 200, size: 5, font: HelveticaFont })


  // GENERAL REMARKS;
  page.drawText('General Remarks:', { x: 30, y: 180, size: 8, font: HelveticaBoldFont })
  page.drawText(obj?.generalRemarks, { x: 140, y: 180, size: 5, font: HelveticaFont })

  // QUALITY STATUS;
  page.drawText('Photo:', { x: 30, y: 140, size: 8, font: HelveticaBoldFont })
  page.drawImage(qualityControlImg, {
    x: 135,
    y: 100,
    width: jpgDims.width,
    height: jpgDims.height
  });

  return await pdfDoc.save()
} 

function formatToJSON(query) {
  return JSON.parse(JSON.stringify(query));
}

const generateAccessToken = (userObj) => {
  try {
    
    let accessToken = jwt.sign({
      ...userObj
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' }); 

    return { accessToken };

  } catch(err) {
    throw err;
  }
}

export {
  generateRandomTemplateId,
  generateRandomContractNumber,
  generateReportPDF,
  formatToJSON,
  generateAccessToken
}