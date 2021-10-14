"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var express_1 = __importDefault(require("express"));
var ConsultsController_1 = require("./controllers/ConsultsController");
var SpecializationsController_1 = require("./controllers/SpecializationsController");
var UsersController_1 = require("./controllers/UsersController");
var routes = express_1.default.Router();
exports.routes = routes;
var specializationsController = new SpecializationsController_1.SpecializationsController();
var usersController = new UsersController_1.UsersController();
var consultsController = new ConsultsController_1.ConsultsController();
// Specializations
routes.post('/specializations/new', specializationsController.newSpecialization);
routes.post('/specializations', specializationsController.createAllSpecializations);
routes.get('/specializations', specializationsController.getSpecializations);
// Users
routes.post('/register', usersController.register);
routes.post('/users', usersController.login);
routes.get('/user/account', usersController.getAccount);
routes.get('/medic/account', usersController.getMedicAccount);
routes.put('/users', usersController.edit);
routes.delete('/users', usersController.delete);
routes.put('/medics', usersController.medicsEdit);
routes.get('/medics/:page', usersController.getMedics);
routes.get('/medic/open_days', usersController.getMedicOpenDays);
routes.post('/medic/open_days', usersController.createOpenDay);
routes.delete('/medic/open_days/:id', usersController.deleteMedicOpenDay);
// Consults
routes.get('/medic/consult_configuration', consultsController.getConfiguration);
routes.post('/medic/consult_configuration', consultsController.createConfiguration);
routes.put('/medic/consult_configuration', consultsController.editConfiguration);
routes.post('/consult/:medic_id', consultsController.createConsult);
routes.get('/consult', consultsController.getConsult);
routes.put('/consult/:consult_id', consultsController.editConsult);
routes.patch('/consult/:consult_id', consultsController.editConsultConfirmation);
