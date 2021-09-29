import express from 'express';
import { routes } from './routes';
import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:3000'
}

const app = express();

app.use(cors(corsOptions))

app.use(express.json());

app.use(routes)

app.listen(3333, () => console.log("Server running on 3333"));