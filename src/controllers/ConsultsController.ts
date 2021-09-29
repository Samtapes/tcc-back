import { ConsultsService } from "../services/ConsultsService";
import { Request, Response } from 'express';


const consultsService = new ConsultsService()

class ConsultsController {

  // Creating consult configuration
  async createConfiguration(req: Request, res: Response): Promise<Response> {

    // Getting consult configuration info
    const { price, start_of_work, end_of_work, description, additional_info } = req.body;

    // Medic ID
    const medic_id = req.headers.authorization;
    
    // Creating consult configuration
    try {
      const consult_configuration_id = await consultsService.createConfiguration({medic_id, price, start_of_work, end_of_work, description, additional_info})
      return res.json(consult_configuration_id);
    } catch (err) {
      return res.status(400).json({message: err.message});
    }
  }

  // Editing consult configuration
  async editConfiguration(req: Request, res: Response): Promise<Response> {

    // Editing consult configuration
    const { price, start_of_work, end_of_work, description, additional_info } = req.body;

    // Getting medic ID
    const medic_id = req.headers.authorization;

    // Editing consult configuration
    try {
      const config = await consultsService.editConfiguration({medic_id, price, start_of_work, end_of_work, description, additional_info})
      return res.json(config);
    } catch (err) {
      return res.status(400).json({message: err.message});
    }
  }

  // Getting consult configuration
  async getConfiguration(req: Request, res: Response): Promise<Response> {
    
    // Getting medic ID
    const id = req.headers.authorization;

    // Getting consult configuration
    try {
      const configuration = await consultsService.getConfiguration(id);
      return res.json(configuration);
    } catch (err) {
      return res.status(400).json({message: err.message});
    }
  }

  // Creating consult
  async createConsult(req: Request, res: Response): Promise<Response> {

    // Getting info
    const { date, scheduled_time, additional_info } = req.body;
    const patient_id = req.headers.authorization;
    const { medic_id } = req.params;

    // Creating consult
    try {
      const consult_id = await consultsService.createConsult({medic_id, patient_id, date, scheduled_time, additional_info})
      return res.json(consult_id);
    } catch (err) {
      return res.json({ error: err.message})
    }
  }

  // Getting consult
  async getConsult(req: Request, res: Response): Promise<Response> {
    const user_id = req.headers.authorization

    try {
      const consults = await consultsService.getConsults(user_id)
      return res.json(consults)
    } catch (err) {
      return res.status(404).json({ message: err.message})
    }
  }

  // Edit consult
  async editConsult(req: Request, res: Response): Promise<Response> {
    const { date, scheduled_time } = req.body;
    const { consult_id } = req.params;
    const user_id = req.headers.authorization;

    try {
      await consultsService.editConsultScheduledTime({consult_id, user_id, date, scheduled_time})
      return res.status(200).send()
    } catch (err) {
      return res.status(404).json({message: err.message})
    }
  }
}

export {ConsultsController}