import dotenv from 'dotenv';
import app from "./app.js";
import { sequelizeConfig } from './db/dbConnect.js';
dotenv.config({ path: "./src/.env" });

const PORT = process.env.PORT || 8000;

sequelizeConfig.authenticate()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.log(`Error - while connecting with DB`, err);
  });