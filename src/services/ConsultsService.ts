import { connection } from "../database/connection";
import { GetDateTime } from "../database/GetDateTime";
import { v4 as uuid } from 'uuid';

const getDateTime = new GetDateTime();

interface ICreateConfiguration {
  medic_id: string;
  price: number;
  start_of_work: string;
  end_of_work: string;
  description: string;
  additional_info: string;
}

interface ICreateConsult {
  medic_id: string, 
  patient_id: string, 
  date: string, 
  scheduled_time: string, 
  additional_info: string
}

interface IEditConsult {
  consult_id: string,
  user_id: string,
  date: string,
  scheduled_time: string
}

interface IConsultConfirmation {
  consult_id: string,
  medic_id: string,
  confirmation: boolean,
}

class ConsultsService {

  // Creating consult configuration
  async createConfiguration({medic_id, price, start_of_work, end_of_work, description, additional_info}: ICreateConfiguration){

    // Checking if the medic exist
    const medicExist = await connection('medics').select('user_id').where('user_id', medic_id).first();

    if(!medicExist){
      throw new Error('Esse médico não existe!');
    }

    // Checking if the consult configuration already were created
    const configExist = await connection('consults_configurations').select('medic_id').where('medic_id', medic_id).first();

    if(configExist){
      throw new Error('A configuração já foi cadastradas! Não é possivel criar nova configuração! Somente editar a mesma');
    }

    // Creating new consult configuration
    await connection('consults_configurations').insert({
      medic_id,
      price,
      start_of_work,
      end_of_work, 
      description, 
      additional_info
    })

    // Returning medic id
    return {medic_id: medicExist.user_id}
  }

  // Edit medic consult configuration
  async editConfiguration({medic_id, price, start_of_work, end_of_work, description, additional_info}: ICreateConfiguration) {

    // Checking if medic exists
    const medicExist = await connection('medics').select('user_id').where('user_id', medic_id).first();

    if(!medicExist){
      throw new Error('Esse médico não existe!');
    }

    // Checking if medic consult configuration already exist
    const configExist = await connection('consults_configurations').select('*').where('medic_id', medic_id).first();

    if(!configExist){
      throw new Error('Configuração de consulta inexistente!');
    }

    // Checking if the medic want to change nothing
    if(price === configExist.price && start_of_work === configExist.start_of_work && end_of_work === configExist.end_of_work && description === configExist.description && additional_info === configExist.additional_info){
      throw new Error('Não é possível alterar a configuração de consulta para a mesma!')
    }

    // Else update medic consult configuration
    await connection('consults_configurations').update({
      price,
      start_of_work,
      end_of_work, 
      description, 
      additional_info,
      updated_at: getDateTime.stamp()
    }).where('medic_id', medic_id);

    // Returning medic consult configuration
    const config = await connection('consults_configurations').select('*').where('medic_id', medic_id).first();

    return config;
  }

  // Get consult configuration
  async getConfiguration(medic_id: string) {

    // Checking if medic exists
    const medicExist = await connection('medics').select('user_id').where('user_id', medic_id).first();

    if(!medicExist){
      throw new Error('Esse médico não existe!');
    }

    // Checking if medic consult configuration already exist
    const configExist = await connection('consults_configurations').select('*').where('medic_id', medic_id).first();

    if(!configExist){
      throw new Error('Configuração de consulta inexistente!');
    }

    // Getting consult configuration
    const configuration = await connection('consults_configurations')
      .where('medic_id', medic_id)
      .join('medics', 'consults_configurations.medic_id', '=', 'medics.user_id')
      .join('specializations', 'medics.specialization_id', '=', 'specializations.id')
      .join('users', 'consults_configurations.medic_id', '=', 'users.id')
      .select('users.id', 'users.image_url','users.name', 'specializations.name as specialization', 'consults_configurations.price', 'consults_configurations.description', 'consults_configurations.additional_info', 'consults_configurations.start_of_work', 'consults_configurations.end_of_work').first();

    return configuration;
  }

  // Create consult
  async createConsult({medic_id, patient_id, date, scheduled_time, additional_info}: ICreateConsult) {

    // Checking if the medic exists
    const medicExist = await connection('medics').select('user_id').where('user_id', medic_id).first();

    if(!medicExist){
      throw new Error('Esse médico não existe!');
    }

    // Checking if the patient exists
    const patientExist = await connection('users').select('id', 'is_medic').where('id', patient_id).first();

    if(!patientExist){
      throw new Error('Esse paciente não existe!');
    }

    // Checking if the patient and the medic are the same
    if(medicExist.user_id === patientExist.id){
      throw new Error("Não é possível marcar uma consulta com você mesmo!");
    }

    // Checking if the patient is medic
    if(patientExist.is_medic){
      throw new Error("Não é possível marcar uma consulta como médico!");
    }

    // Checking if the medic created consult configuration
    const configExist = await connection('consults_configurations').select('*').where('medic_id', medic_id).first();

    if(!configExist){
      throw new Error('Médico não criou configuração de consulta!');
    }


    // Checking if medic is open in this day
    var openInThisDay = false;

    const open_days = await connection('open_days').select('date').where('medic_id', medic_id)

    open_days.forEach(element => {
      if (element.date === date){
        openInThisDay = true;
      }
    });

    if(!openInThisDay){
      throw new Error('O médico não está aberto nesse dia!')
    }


    // Checking if medic is open at this time
    var openInThisTime = false;


    const start_hour = parseInt(String(configExist.start_of_work[0]) + String(configExist.start_of_work[1]))
    const start_minute = parseInt(String(configExist.start_of_work[3]) + String(configExist.start_of_work[4]))

    const end_hour = parseInt(String(configExist.end_of_work[0]) + String(configExist.end_of_work[1]))
    // const end_minute = parseInt(String(configExist.end_of_work[3]) + String(configExist.end_of_work[4]))

    const scheduled_time_hour = parseInt(String(scheduled_time[0]) + String(scheduled_time[1]))
    const scheduled_time_minute = parseInt(String(scheduled_time[3]) + String(scheduled_time[4]))

    if( scheduled_time_hour > start_hour && scheduled_time_hour < end_hour ){
      openInThisTime = true;
    }

    else if(scheduled_time_hour === start_hour) {
      if(scheduled_time_minute >= start_minute){
        openInThisTime = true;
      }
    }

    if(!openInThisTime){
      throw new Error('O médico não está aberto nesse horário, tente outro!')
    }



    // Checking if medic have a consult at this time
    var consultInThisTime = false;

    const consults = await connection('consults').select('scheduled_time').where('medic_id', medic_id).where('date', date)

    consults.forEach(element => {
      let existent_hour = parseInt(String(element.scheduled_time[0]) + String(element.scheduled_time[1]))
      let existent_minute = parseInt(String(element.scheduled_time[3]) + String(element.scheduled_time[4]))

      let scheduled_hour = parseInt(String(scheduled_time[0]) + String(scheduled_time[1]))
      let scheduled_minute = parseInt(String(scheduled_time[3]) + String(scheduled_time[4]))

      // If the exactly consult time is equal to the new consult time
      if (element.scheduled_time === scheduled_time){
        consultInThisTime = true;
      }

      // If the hour is the same to the new consult time
      if (existent_hour === scheduled_hour) {
        consultInThisTime = true;
      }

      // If the new hour is in the next hour before old the consult ends
      if (existent_hour + 1 === scheduled_hour && scheduled_minute < existent_minute) {
        consultInThisTime = true;
      }
    });

    if(consultInThisTime){
      throw new Error('O médico já possui uma consulta agendada nesse horário, tente outro!')
    }


    const consult_id = uuid();

    // Creating consult
    await connection('consults').insert({
      id: consult_id,
      medic_id, 
      patient_id,
      date,
      scheduled_time,
      additional_info
    })

    return {id: consult_id}
  }

  // Get consult
  async getConsults(user_id: string) {

    const is_medic = await connection('users').where('id', user_id).select('is_medic').first()

    // Checking if user exists
    if (!is_medic) {  
      throw new Error('Esse usuário não existe!')
    }

    // Getting consult data if the user that is requesting is a medic
    if (is_medic.is_medic) {
      const consult = await connection('consults').where('medic_id', user_id).join('users', 'consults.patient_id', '=', 'users.id').select('consults.id', 'users.image_url', 'users.name', 'consults.additional_info', 'consults.date', 'consults.scheduled_time')
      return consult
    }

    // Getting consult data if the user that is requesting is a patient
    else {
      const consult = await connection('consults').where('patient_id', user_id).join('users', 'consults.medic_id', '=', 'users.id').join('medics', 'consults.medic_id', '=', 'medics.user_id').join('specializations', 'medics.specialization_id', '=', 'specializations.id').select('consults.id', 'specializations.name as specialization', 'users.image_url', 'users.name', 'consults.additional_info', 'consults.date', 'consults.scheduled_time')
      return consult
    }
  }

  // Edit consult
  async editConsultScheduledTime({consult_id, user_id, date, scheduled_time}: IEditConsult) {

    // Checking if user exists
    const userExists = await connection('users').where('id', user_id).select('is_medic').first()

    if (!userExists) {
      throw new Error("Usuário inexistente!")
    }


    // Checking if this consult exist
    const consultExists = await connection('consults').where('id', consult_id).select('*').first()

    if (!consultExists) {
      throw new Error("Consulta inexistente")
    }


    // Checking if the user is changing nothing
    if (date === consultExists.date && consultExists.scheduled_time === scheduled_time) {
      throw new Error("Não é possível alterar a consulta para o mesmo horário!")
    }


    // Checking if this user have this consult
    if (userExists.is_medic) {
      const userConsultExists = await connection('consults').where('id', consult_id).where('medic_id', user_id).select('*').first()
  
      if (!userConsultExists) {
        throw new Error("Essa consulta não é sua!")
      }
    }

    // Checking if this user have this consult
    else {
      const userConsultExists = await connection('consults').where('id', consult_id).where('patient_id', user_id).select('*').first()
  
      if (!userConsultExists) {
        throw new Error("Essa consulta não é sua!")
      }
    }


    // Checking if medic is open in this day
    var openInThisDay = false;

    const open_days = await connection('open_days').select('date').where('medic_id', consultExists.medic_id)

    open_days.forEach(element => {
      if (element.date === date){
        openInThisDay = true;
      }
    });

    if(!openInThisDay){
      throw new Error('O médico não está aberto nesse dia!')
    }


    // Checking if the medic created consult configuration
    const configExist = await connection('consults_configurations').select('*').where('medic_id', consultExists.medic_id).first();

    if(!configExist){
      throw new Error('Médico não criou configuração de consulta!');
    }    


    // Checking if medic is open at this time
    var openInThisTime = false;


    const start_hour = parseInt(String(configExist.start_of_work[0]) + String(configExist.start_of_work[1]))
    const start_minute = parseInt(String(configExist.start_of_work[3]) + String(configExist.start_of_work[4]))

    const end_hour = parseInt(String(configExist.end_of_work[0]) + String(configExist.end_of_work[1]))
    // const end_minute = parseInt(String(configExist.end_of_work[3]) + String(configExist.end_of_work[4]))

    const scheduled_time_hour = parseInt(String(scheduled_time[0]) + String(scheduled_time[1]))
    const scheduled_time_minute = parseInt(String(scheduled_time[3]) + String(scheduled_time[4]))

    if( scheduled_time_hour > start_hour && scheduled_time_hour < end_hour ){
      openInThisTime = true;
    }

    else if(scheduled_time_hour === start_hour) {
      if(scheduled_time_minute >= start_minute){
        openInThisTime = true;
      }
    }

    if(!openInThisTime){
      throw new Error('O médico não está aberto nesse horário, tente outro!')
    }



    // Checking if medic have a consult at this time
    var consultInThisTime = false;

    const consults = await connection('consults').select('scheduled_time', 'id').where('medic_id', consultExists.medic_id).where('date', date)

    consults.forEach(element => {
      let existent_hour = parseInt(String(element.scheduled_time[0]) + String(element.scheduled_time[1]))
      let existent_minute = parseInt(String(element.scheduled_time[3]) + String(element.scheduled_time[4]))

      let scheduled_hour = parseInt(String(scheduled_time[0]) + String(scheduled_time[1]))
      let scheduled_minute = parseInt(String(scheduled_time[3]) + String(scheduled_time[4]))

      // If the exactly consult time is equal to the new consult time
      if (element.scheduled_time === scheduled_time && element.id !== consult_id){
        consultInThisTime = true;
      }

      // If the hour is the same to the new consult time
      if (existent_hour === scheduled_hour && element.id !== consult_id) {
        consultInThisTime = true;
      }

      // If the new hour is in the next hour before old the consult ends
      if (existent_hour + 1 === scheduled_hour && scheduled_minute < existent_minute && element.id !== consult_id) {
        consultInThisTime = true;
      }
    });

    if(consultInThisTime){
      throw new Error('O médico já possui uma consulta agendada nesse horário, tente outro!')
    }

    // Updating consult info is user is medic
    if (userExists.is_medic) {
      await connection('consults').where('id', consult_id).where('medic_id', user_id).update({
        date,
        scheduled_time,
        updated_at: getDateTime.stamp()
      })
    }

    
    // Updating consult info is user is a patient
    else {
      await connection('consults').where('id', consult_id).where('patient_id', user_id).update({
        date,
        scheduled_time,
        updated_at: getDateTime.stamp()
      })
    }
  }

  // Edit consult confirmation
  async editConsultConfirmation({consult_id, medic_id, confirmation}: IConsultConfirmation) {

    // Checking if medic exists
    const userExists = await connection('medics').where('user_id', medic_id).select('specialization_id').first()

    if (!userExists) {
      throw new Error("Médico inexistente!")
    }


    // Checking if this consult exist
    const consultExists = await connection('consults').where('id', consult_id).select('*').first()

    if (!consultExists) {
      throw new Error("Consulta inexistente")
    }


    // Checking if the user is changing nothing
    if (confirmation === consultExists.confirmed) {
      throw new Error("Não é possível não mudar nada!")
    }


    // Checking if this user have this consult
    const userConsultExists = await connection('consults').where('id', consult_id).where('medic_id', medic_id).select('*').first()

    if (!userConsultExists) {
      throw new Error("Essa consulta não é sua!")
    }


    // Checking if the medic created consult configuration
    const configExist = await connection('consults_configurations').select('*').where('medic_id', consultExists.medic_id).first();

    if(!configExist){
      throw new Error('Médico não criou configuração de consulta!');
    }    


    // Updating consult confirmation
    await connection('consults').where('id', consult_id).where('medic_id', medic_id).update({
      confirmed: confirmation,
      updated_at: getDateTime.stamp()
    })
  }
}

export {ConsultsService}