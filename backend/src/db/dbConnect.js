import { Sequelize } from 'sequelize';

const sequelizeConfig = new Sequelize('urlshortener', 'codewithmero', 'Rudra@123qwe', {
  host: 'localhost',
  dialect: 'mysql'
});

export {
  sequelizeConfig
};

