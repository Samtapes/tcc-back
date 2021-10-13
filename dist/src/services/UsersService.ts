import { v4 as uuid} from "uuid";
import { connection } from "../database/connection"
import { GetDateTime } from "../database/GetDateTime";

const getDateTime = new GetDateTime();

// Typescript interfaces
interface IMedic{
  specialization_id: string;
  register_number: string;
  phone_number: string;
}

interface IUserRegister{
  name: string;
  email: string;
  password: string;
  medic?: IMedic;
}

interface IUserAccountEdit{
  id: string;
  image_url: string;
  email: string;
  password: string;
  age: number;
  mass: number;
  chronic_diseases: string;
}

interface IUserMedicAccountEdit{
  id: string;
  description: string;
  phone_number: string;
  patient_preferences: string;
}


// User service class
class UsersService {

  // Register
  async register({name, email, password, medic}: IUserRegister){
    const userExists = await connection('users').select('id').where('email', '=', email).first();

    // Checking if user exists
    if (userExists !== undefined) {
      throw new Error(`Esse Email já está em uso!`);
    } else {

      if(medic) {
        const specializationExists = await connection('specializations').select('id').where('id', '=', medic.specialization_id).first();
        
        // Checking if specialization exists
        if (specializationExists === undefined) {
          throw new Error(`Essa especialização não existe!`);
        }
      }


      const userID = uuid()
      // Creating user
      await connection('users').insert({
        id: userID,
        name,
        email,
        password,
        is_medic: Boolean(medic)
      })

      // Creating user account data
      await connection('accounts_data').insert({
        user_id: userID,
      })

      // If is a medic 
      if (medic) {

        const specializationExists = await connection('specializations').select('id').where('id', '=', medic.specialization_id).first();

        // Checking if specialization exists
        if (specializationExists === undefined) {
          throw new Error(`Essa especialização não existe!`);
        }
    
        await connection('medics').insert({
          user_id: userID,
          specialization_id: medic.specialization_id,
          register_number: medic.register_number,
          phone_number: medic.phone_number,
        })
      }

    }

    // Returning user ID
    const user = await connection('users').select('id').where('email', '=', email).first();

    return user

  }

  // Login
  async login(email: string, password: string) {

    // Checking if user exists
    const emailExists = await connection('users').select('id', 'is_medic').where('email', '=', email).first();

    if (!emailExists) {
      throw new Error("Conta inexistente");
    }

    // Getting user data
    const user = await connection('users')
    .where('email', '=', email)
    .where('password', '=', password)
    .select('users.id', 'users.image_url', 'users.name', 'users.email', 'users.password', 'users.is_medic')
    .first();

    // If the password is wrong
    if (!user) {
      throw new Error("Senha incorreta!");
    }

    return user
  }

  // Get user account
  async getAccount(id: string) {

    // Getting user account
    const userAccount = await connection('accounts_data').where('user_id', id).select('accounts_data.age', 'accounts_data.mass', 'accounts_data.chronic_diseases').first();

    // Checking if exists
    if (!userAccount){
      throw new Error("Conta inexistente");
    }

    return userAccount;
  }

  // Get medic account
  async getMedicAccount(id: string) {

    // Getting medic account
    const medicAccount = await connection('medics')
      .join('specializations', 'medics.specialization_id', '=', 'specializations.id')
      .where('user_id', id)
      .select('medics.user_id', 'specializations.name as specialization', 'medics.register_number', 'medics.description', 'medics.phone_number', 'medics.patient_preferences')
      .first()

    // Checking if the medic exists
    if(!medicAccount){
      throw new Error("Conta inexistente!");
    }

    return medicAccount;
  }

  // Edit account data
  async editAccout({id, image_url, password, age, mass, chronic_diseases}: IUserAccountEdit) {

    // Checking if user exists and getting some account info 
    const user = await connection('users')
      .join('accounts_data', 'users.id', '=', 'accounts_data.user_id')
      .select('users.id', 'users.email', 'users.password', 'accounts_data.age', 'accounts_data.mass', 'accounts_data.chronic_diseases')
      .where('users.id', '=', id)
      .first();

    if (!user) {
      throw new Error("Conta inexistente");
    }


    // If the user want to change some user info
    if(image_url !== user.image_url || password !== user.password) {
      await connection('users').update({
        image_url,
        password,
        updated_at: getDateTime.stamp()
      }).where('id', id)
    }

    // If the user want to change some account info
    if(age !== user.age || mass !== user.mass || chronic_diseases !== user.chronic_diseases) {
      await connection('accounts_data').update({
        age,
        mass,
        chronic_diseases,
        updated_at: getDateTime.stamp()
      }).where('user_id', id)
    }

    // If the user want to edit nothing
    if(image_url === user.image_url && password && user.password && age === user.age && mass === user.mass && chronic_diseases === user.chronic_diseases){
      throw new Error("Não é possível editar suas informações para o mesmo que deseja alterar")
    }

    // returning user new info
    const userUpdated = await connection('users')
    .where('id', '=', id)
    .join('accounts_data', 'users.id', 'accounts_data.user_id')
    .select('users.id', 'users.image_url', 'users.name', 'users.email', 'users.password', 'accounts_data.age', 'accounts_data.mass', 'accounts_data.chronic_diseases')
    .first();

    return userUpdated
  }

  // Edit medic account
  async editMedicAccount({id, description, phone_number, patient_preferences}: IUserMedicAccountEdit) {

    // Checking if medic exist
    const user = await connection('medics').select('user_id', 'description', 'phone_number', 'patient_preferences').where('user_id', '=', id).first();

    if (!user) {
      throw new Error("Conta inexistente");
    }

    // If the medic want to change some medic account info
    if(description !== user.description || phone_number !== user.phone_number || patient_preferences !== user.patient_preferences) {
      await connection('medics').update({
        description,
        phone_number,
        patient_preferences,
        updated_at: getDateTime.stamp()
      }).where('user_id', id)
    }

    // If the medic want to edit nothing
    else {
      throw new Error("Não é possível editar suas informações para o mesmo que deseja alterar")
    }

    // returning user new info
    const userUpdated = await connection('medics').select('user_id', 'description', 'phone_number', 'patient_preferences').where('user_id', '=', id).first();

    return userUpdated
  }

  // Get all the medics
  async getMedics(page: number, specialization_id?: string) {

    // If the user does not filter
    if(specialization_id === null || specialization_id === undefined) {
      const medics = await connection('medics')
        .join('users', 'medics.user_id', '=', 'users.id')
        .join('specializations', 'medics.specialization_id', '=', 'specializations.id')
        .join('consults_configurations', 'medics.user_id', '=', 'consults_configurations.medic_id')
        .select('users.id', 'users.name', 'users.image_url', 'specializations.name as specialization').limit(10)
        .offset(10 * page);
      return medics
    }

    // If the user filter
    const medics = await connection('medics')
      .join('users', 'medics.user_id', '=', 'users.id')
      .join('specializations', 'medics.specialization_id', '=', 'specializations.id')
      .select('users.id', 'users.name', 'users.image_url', 'specializations.name as specialization')
      .where('specializations.id', '=', specialization_id).limit(10)
      .offset(10 * page);

    return medics
  }

  // Delete account
  async delete(id: string) {

    // Checking if user exist
    const user = await connection('users').select('*').where('id', id).first();

    if(user === undefined) {
      throw new Error("Usuário inexistente!");
    }

    // Deleting user
    const deleteUser = await connection('users').where('id', id).delete();

    // Deleting user account
    const deleteAccountsData = await connection('accounts_data').where('user_id', id).delete();

    // If the user is medic, delete medic tables
    if(user.is_medic){
      const deleteMedic = await connection('medics').where('user_id', id).delete();
      const deleteConsultsConfigurations = await connection('consults_configurations').where('medic_id', id).delete();
      const deletOpenDays = await connection('open_days').where('medic_id', id).delete();
    }

    // Deleting user connection
    const deleteConnections = await connection('connections').where('user_id', id).delete();

    // Deleting user verification code if were requested
    const deleteVerificationCodes = await connection('verification_codes').where('user_id', id).delete();
  }

  // Create new open days
  async createOpenDay(id: string, date: string) {

    // Checking if this medic exist
    const medicExist = await connection('medics').where('user_id', id).select('user_id').first();

    if(!medicExist) {
      throw new Error("Conta inexistente!");
    }

    // Checking if this open day already were created
    const openDayExist = await connection('open_days').where('medic_id', id).where('date', date).select('id').first();

    if(openDayExist) {
      throw new Error("Não é possível criar um novo dia livre em um mesmo dia que já está livre!");
    }

    // Checking if this day is in the future or today
    if (getDateTime.isPast(date)){
      throw new Error("Não é possível criar um novo dia livre em um dia já passado!")
    }

    // Creating new open day
    const open_day_id = uuid();

    await connection('open_days').insert({
      id: uuid(),
      medic_id: id,
      date
    })

    return {id: open_day_id};
  }

  // Get medic open days
  async getMedicOpenDays(id: string) {

    // Checking if medic exist
    const medicExist = await connection('medics').where('user_id', id).select('user_id').first();

    if(!medicExist) {
      throw new Error("Conta inexistente!");
    }

    // Getting open days
    const open_days = await connection('medics').where('user_id', id).join('open_days', 'medics.user_id', '=', 'open_days.medic_id').select('open_days.id','open_days.date');

    return open_days;
  }

  // Delete medic open day
  async deleteMedicOpenDay(medic_id: string, id: string) {

    // Checking if medic exist
    const medicExist = await connection('medics').where('user_id', medic_id).select('user_id').first();

    if(!medicExist) {
      throw new Error("Conta inexistente!");
    }

    // Checking if this open day exist
    const openDayExist = await connection('open_days').where('id', id).select('*').first();

    if(!openDayExist) {
      throw new Error("Não é possível deletar esse dia em que o médico está aberto sendo que não existe!");
    }

    // Deleting the specific open day
    await connection('open_days').where('id', id).delete();

    return true
  }
}

export {UsersService}