"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = require("./routes");
var cors_1 = __importDefault(require("cors"));
var corsOptions = {
    origin: ['https://conncare.herokuapp.com', 'http://localhost:3000']
};
var app = express_1.default();
app.use(cors_1.default(corsOptions));
app.use(express_1.default.json());
app.use(routes_1.routes);
var port = process.env.PORT || 3333;
app.listen(port, function () { return console.log("Server running on 3333"); });
