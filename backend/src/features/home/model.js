import dotenv from 'dotenv';
import { MainModel } from '../shared/main-model.js';
import { CustomError } from '../../core/error/index.js';
import { validatePartialHomeSchema } from '../../core/schemas/home.schema.js';

dotenv.config();
const database = process.env.MONGO_DB;
const collection = 'home';

export class HomeModel extends MainModel {
  static async provideData() {
    const db = await super.connectToMongo({ db: database, collection });

    const [response] = await db.find().toArray();

    return response;
  }

  static async updateData(input) {
    const db = await super.connectToMongo({ db: database, collection });
    const { success, error } = validatePartialHomeSchema(input);

    if (success) {
      const [home] = await db.find().toArray();

      return await super.findByInAndUpdate(db, home._id, input);
    }

    throw new CustomError(400, error.message);
  }
}
