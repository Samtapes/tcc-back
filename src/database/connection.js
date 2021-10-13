"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
var knex_1 = require("knex");
var knexfile_1 = require("../../knexfile");
var connection = knex_1.knex(knexfile_1.configuration.development);
exports.connection = connection;
