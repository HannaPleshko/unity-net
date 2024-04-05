import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import route from './controller/user.controller.js'
import { errorMiddleware } from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/api/v1/user', route)

app.use(errorMiddleware)

export default app