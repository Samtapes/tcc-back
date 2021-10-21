import {http} from './http';
import './websocket/index'

const port = process.env.PORT || 3333;

http.listen(port, () => console.log("Server running on 3333"));