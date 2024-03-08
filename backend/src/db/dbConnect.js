import { Sequelize } from 'sequelize';

{/* I HAVEN'T CONVERTED THESE CREDS TO ENV PATHS SINCE THESE WERE LOCAL TO MY MACHINE */}
{/* You need the following: */}
{/* 1) DB NAME */}
{/* 2) DB USER */}
{/* 3) DB PASSWORD */}
const sequelizeConfig = new Sequelize('urlshortener', 'codewithmero', 'Rudra@123qwe', {
  host: 'localhost',
  dialect: 'mysql'
});

export {
  sequelizeConfig
};

