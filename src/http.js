"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.http = void 0;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var routes_1 = require("./routes");
var corsOptions = {
    origin: '*'
};
var app = express_1.default();
app.use(cors_1.default(corsOptions));
var http = http_1.createServer(app); // Protocolo http
exports.http = http;
var io = new socket_io_1.Server(http); // Protocolo ws
exports.io = io;
io.on("connection", function (socket) {
    console.log('Se conectou', socket.id);
});
app.use(express_1.default.json());
app.use(routes_1.routes);
