"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("../http");
http_1.io.on('connect', function (socket) {
    socket.on("message", function (params) {
        console.log(params);
    });
});
