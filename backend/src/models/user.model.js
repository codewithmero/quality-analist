import { sequelizeConfig } from '../db/dbConnect.js';
import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';

const User = sequelizeConfig.define(
  'users',
  {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  },
  {
    timestamps: true
  }
);

// User.sync({ alter: true }).then(() => { console.log("User model has been synced.") });

// HASHING USER PASSWORD;
User.beforeCreate(async (user, options) => {
  console.log(user, options);
  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(user.password, salt);

  user.password = hashedPassword;
});

// User.sync({ alter: true }).then(() => { console.log("User model has been synced.") });

export default User;
