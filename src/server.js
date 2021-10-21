"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("./http");
require("./websocket/index");
var port = process.env.PORT || 3333;
http_1.http.listen(port, function () { return console.log("Server running on 3333"); });
