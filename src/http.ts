import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io'

import { routes } from './routes';


const corsOptions = {
  origin: '*'
}

const app = express();

app.use(cors(corsOptions))


const http = createServer(app); // Protocolo http
const io = new Server(http); // Protocolo ws

io.on("connection", (socket: Socket) => {
  console.log('Se conectou', socket.id)
})


app.use(express.json());

app.use(routes)

export { http, io }