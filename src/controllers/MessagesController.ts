import {Request, Response} from 'express';
import { MessagesService } from "../services/MessagesService";

const messagesService = new MessagesService()

class MessagesController{
  async createMessage(req: Request, res: Response): Promise<Response> {
    const {consult_id} = req.params;
    const sender_id = req.headers.authorization;
    const {text} = req.body;

    try {
      const message_id = await messagesService.createMessage({consult_id, sender_id, text});
      return res.json({message_id});
    } catch (err) {
      return res.status(404).json({message: err.message})
    }
  }

  async getMessages(req: Request, res: Response): Promise<Response> {
    const {consult_id} = req.params;
    const sender_id = req.headers.authorization;

    try {
      const messages = await messagesService.getMessages(consult_id, sender_id);
      return res.json(messages);
    } catch (err) {
      return res.status(404).json({message: err.message})
    }


  }
}

export {MessagesController}