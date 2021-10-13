import express from 'express';
import { routes } from './routes';
import cors from 'cors';

const corsOptions = {
  origin: '*'
}

const app = express();

app.use(cors(corsOptions))

app.use(express.json());

app.use(routes)

const port = process.env.PORT || 3333;

app.listen(port, () => console.log("Server running on 3333"));