import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import route from './controller/user.controller.js'
import { errorMiddleware } from './middlewares/error.middleware.js';


const app = express();

app.use(cors())
app.use(bodyParser.json())

app.use('/api/v1/user', route)

app.use(errorMiddleware)

export default app