import { specializationsDB } from "../services/SpecializationsService";
import { Request, Response } from "express";


class SpecializationsController {
  async newSpecialization(req: Request, res: Response) : Promise<Response> {
    const {name} = req.body;

    try{
      await specializationsDB.newSpecialization(name);
      return res.status(200).send();
    } catch(err) {
      return res.status(400).json({message: err.message});
    }

  }

  async createAllSpecializations(req: Request, res: Response) : Promise<Response> {
    try{
      await specializationsDB.initDB();
      return res.status(200).send();
    } catch(err) {
      return res.status(400).json({message: err.message});
    }
  }

  async getSpecializations(req: Request, res: Response): Promise<Response> {
    try{
      const specializations = await specializationsDB.getSpecializations();
      return res.json(specializations);
    } catch(err) {
      return res.status(400).json({message: err.message});
    }
  }
}

export {SpecializationsController}