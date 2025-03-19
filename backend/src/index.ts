import express from 'express'
import cors from 'cors'
import { routes } from './routes/index.routes';
import connect from './database/mongo';

export const app = express();
connect();
app.use(cors())
app.use(express.json());
app.use("/api", routes);