import { connection } from "../database/connection";
import {v4 as uuid} from 'uuid';


interface IMessage {
  consult_id: string,
  sender_id: string,
  text: string
}


class MessagesService{
  async createMessage({consult_id, sender_id, text}: IMessage){

    const userExists = await connection('users').select('*').where('id', sender_id).first();

    if(!userExists) {
      throw new Error('Esse usuário não existe!')
    }

    // Checking if consult exists and this user is from this consult
    const consultExists = await connection('consults').select('*').where('id', consult_id).where(userExists.is_medic ? 'medic_id' : 'patient_id', sender_id).first()

    if(!consultExists) {
      throw new Error('Essa consulta não existe ou não é sua!')
    }

    const id = uuid()

    await connection('messages').insert({
      id,
      consult_id,
      sender_id,
      text
    })

    return id
  }

  async getMessages(consult_id: string, sender_id: string){
    const userExists = await connection('users').select('*').where('id', sender_id).first();

    if(!userExists) {
      throw new Error('Esse usuário não existe!')
    }

    // Checking if consult exists and this user is from this consult
    const consultExists = await connection('consults').select('*').where('id', consult_id).where(userExists.is_medic ? 'medic_id' : 'patient_id', sender_id).first()

    if(!consultExists) {
      throw new Error('Essa consulta não existe ou não é sua!')
    }

    const messages = await connection('messages').join('users', 'messages.sender_id', 'users.id').where('consult_id', consult_id).select('messages.id', 'messages.consult_id', 'messages.sender_id', 'users.name', 'messages.text');

    return messages
  }
}

export {MessagesService}