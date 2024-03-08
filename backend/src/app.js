import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// IMPORTING AND USING ROUTES;
import appRouter from './routes/routes.js';
app.use("/api/v1", appRouter); 

export default app;