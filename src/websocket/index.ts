import { Socket } from 'socket.io';
import {io} from '../http';

io.on('connect', (socket: Socket) => {
  socket.on("message", (params) => {
    console.log(params)
  })
})