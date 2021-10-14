import express from 'express';
import { ConsultsController } from './controllers/ConsultsController';
import { SpecializationsController } from './controllers/SpecializationsController';
import { UsersController } from './controllers/UsersController';


const routes = express.Router();

const specializationsController = new SpecializationsController();
const usersController = new UsersController();
const consultsController = new ConsultsController()

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
routes.get('/consult/:consultType', consultsController.getConsult);
routes.put('/consult/:consult_id', consultsController.editConsult);
routes.patch('/consult/:consult_id', consultsController.editConsultConfirmation)

// change start of the consult and end, createAvaliation, getAvaliations, return avalaition in medic user search, createMessage, getMessages, 

export {routes}