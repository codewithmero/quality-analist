import { sequelizeConfig } from '../db/dbConnect.js';
import { DataTypes } from 'sequelize';

const Category = sequelizeConfig.define(
  'categories',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    alias: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    timestamps: true
  }
);

export default Category;
