import { sequelizeConfig } from '../db/dbConnect.js';
import { DataTypes } from 'sequelize';

const Report = sequelizeConfig.define(
  'reports',
  {
    reportName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    projectName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    organization: {
      type: DataTypes.STRING,
      allowNull: false
    },
    qualityInspectorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    inspectionNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contractNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    templateId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reportCategory: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    templateVersion: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    formVersion: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    contractorName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reportFile: {
      type: DataTypes.STRING,
      allowNull: true
    },
    generalRemarks  : {
      type: DataTypes.TEXT
    },
    inspectionStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: true
    }
  },
  {
    timestamps: true
  }
);

Report.sync({ alter: true }).then(() => { console.log("Report model has been synced.") });

export default Report;
