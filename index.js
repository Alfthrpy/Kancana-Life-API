import express from 'express';
import dotenv from "dotenv";
import path from 'path'
import { fileURLToPath } from 'url';
import cors from 'cors';
import dataSensorRoute from './src/routes/dataSensorRoute.js';
import deviceRoute from './src/routes/deviceRoute.js'
import morgan from 'morgan';
import compression from 'compression';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(compression())
app.use(morgan('combined'))
app.use('/hello',(req,res)=>{res.json({message:'Hello World'})});
app.use('/api',dataSensorRoute);
app.use('/api',deviceRoute)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
}) 

export default app;