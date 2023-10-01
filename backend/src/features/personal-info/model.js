import dotenv from 'dotenv';
import { MainModel } from '../shared/main-model.js';
import { CustomError } from '../../core/error/index.js';
import { validatePartialPersonalInfoSchema } from '../../core/schemas/personal-info.schema.js';

dotenv.config();
const database = process.env.MONGO_DB;
const collection = 'personal_info';

export class PersonalInfoModel extends MainModel {
  static async provideData() {
    const db = await super.connectToMongo({ db: database, collection });

    const [response] = await db.find().toArray();

    return response;
  }

  static async updateData(input) {
    const db = await super.connectToMongo({ db: database, collection });
    const { success, error } = validatePartialPersonalInfoSchema(input);

    if (success) {
      const [personalInfo] = await db.find().toArray();

      return await super.findByInAndUpdate(db, personalInfo._id, input);
    }

    throw new CustomError(400, error.message);
  }
}
