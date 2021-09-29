import {Request, Response} from 'express';
import { specializationsDB } from '../services/SpecializationsService';
import { UsersService } from "../services/UsersService";

const usersService = new UsersService();

// User controller class
class UsersController {

  // Register
  async register(req: Request, res: Response): Promise<Response>{

    // Getting user register info
    const {image_url, name, email, password, medic} = req.body;

    // Creating account
    try{
      const user_id = await usersService.register({image_url, name, email, password, medic});
      return res.json(user_id);
    }catch(err){
      return res.status(400).json({message: err.message});
    }
  }

  // Login
  async login(req: Request, res: Response): Promise<Response> {

    // Getting user login info
    const {email, password} = req.body;

    // creating login
    try{
      const user = await usersService.login(email, password);
      return res.json(user);
    } catch (err) {
      return res.status(400).json({message: err.message});
    }
  }

  // Get user account
  async getAccount(req: Request, res: Response): Promise<Response> {

    // Getting user id
    const id = req.headers.authorization;

    // Getting user account
    try {
      const userAccount = await usersService.getAccount(id);
      return res.json(userAccount);
    } catch (err) {
      return res.status(400).json({message: err.message});
    }
  }

  // Getting medic account
  async getMedicAccount(req: Request, res: Response): Promise<Response> {
    
    // Getting medic id
    const id = req.headers.authorization;

    // Getting medic account
    try {
      const medicAccount = await usersService.getMedicAccount(id);
      return res.json(medicAccount);
    } catch (err) {
      return res.status(400).json({ message: err.message });
    }
  }

  // Edit account
  async edit(req: Request, res: Response): Promise<Response> {

    // Getting user account info
    const {image_url, email, password, age, mass, chronic_diseases} = req.body;
    const id = req.headers.authorization;

    // Editing account
    try {
      const user = await usersService.editAccout({id, image_url, email, password, age, mass, chronic_diseases});
      return res.json(user);
    } catch (err) {
      return res.status(400).json({message: err.message});
    }
  }

  // Edit medic account
  async medicsEdit(req: Request, res: Response): Promise<Response> {

    // Getting medic info
    const {description, phone_number, patient_preferences} = req.body;
    const id = req.headers.authorization;

    // Editing account
    try {
      const user = await usersService.editMedicAccount({id, description, phone_number, patient_preferences});
      return res.json(user);
    } catch (err) {
      return res.status(400).json({message: err.message});
    }
  }

  // Search medics
  async getMedics(req: Request, res: Response): Promise<Response> {
    const {page=0} : any = req.params;
    const {specialization_name=""} : any = req.query;

    const specialization_id = await specializationsDB.getSpecializationIdByName(specialization_name);

    try {
      const medics = await usersService.getMedics(page, specialization_id);
      return res.json(medics);
    } catch (err) {
      return res.status(400).json({message: err.message});
    }

  }

  // Delete account
  async delete(req: Request, res: Response): Promise<Response> {
    const user_id : any = req.headers.authorization;

    try {
      await usersService.delete(user_id);
      return res.status(200).send();
    } catch (err) {
      return res.status(400).json({message: err.message});
    }
  }

  // Create medic open days
  async createOpenDay(req: Request, res: Response): Promise<Response> {
    const { date } = req.body;
    const id = req.headers.authorization;

    try {
      const open_day_id = await usersService.createOpenDay(id, date);
      return res.json(open_day_id);
    } catch(err) {
      return res.status(400).json({message: err.message});
    }
  }

  // Get medic open days
  async getMedicOpenDays(req: Request, res: Response): Promise<Response> {
    const id = req.headers.authorization;

    try {
      const medic_open_days = await usersService.getMedicOpenDays(id);
      return res.json(medic_open_days);
    } catch(err) {
      return res.status(400).json({message: err.message});
    }
  }

  // Delete medic open day
  async deleteMedicOpenDay(req: Request, res: Response): Promise<Response> {
    const medic_id = req.headers.authorization;
    const {id} = req.params;

    try {
      await usersService.deleteMedicOpenDay(medic_id, id);
      return res.status(200).send();
    } catch(err) {
      return res.status(400).json({message: err.message});
    }
  }
}

export {UsersController};