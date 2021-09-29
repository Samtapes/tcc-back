import { v4 as uuid} from "uuid";
import { connection } from "../database/connection";

class SpecializationsDB{
  private specializations : Array<string>

  // Initialing the constructor to set specializations inside class
  constructor(specializations : Array<string>) {
    this.specializations = specializations;
  }


  // Function to init db to default specializations state
  async initDB(){
    for(var i = 0; i < this.specializations.length; i++) {
      await connection('specializations').insert({
        id: uuid(),
        name: specializations[i]
      })
    }

    return true
  }

  // Creating a new specialization after init db
  async newSpecialization(name:string){
    await connection('specializations').insert({
      id: uuid(),
      name
    })
  }

  // Get all specializations
  async getSpecializations(){
    const specializations = await connection('specializations').select('*');
    return specializations;
  }

  // Get specialization by name
  async getSpecializationIdByName(name:string){
    const specialization_id = await connection('specializations').select('id').where('name', name).first();
    return specialization_id?.id;
  }

}

// Specializations
const specializations = [
  'Alergia e imunologia', 
  'Anestesiologia',
  'Cardiologia',
  'Cirurgia geral',
  'Clínica médica',
  'Dermatologia',
  'Endocrinologia',
  'Endoscopia',
  'Gastroenterologia',
  'Geriatria',
  'Ginecologia e obstetrícia',
  'Hematologia e hemoterapia',
  'Infectologia',
  'Medicina',
  'Medicina do trabalho',
  'Medicina intensiva',
  'Medicina legal e perícia médica',
  'Nefrologia',
  'Neurocirurgia',
  'Neurologia',
  'Nutrologia',
  'Oftalmologia',
  'Oncologia',
  'Ortopedia e traumatologia',
  'Otorrinolaringologia',
  'Patologia',
  'Pediatria',
  'Pneumologia',
  'Psiquiatria',
  'Reumatologia',
  'Urologia'
]

const specializationsDB = new SpecializationsDB(specializations);

// specializationsDB.initDB();

export {specializationsDB};