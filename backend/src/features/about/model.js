import dotenv from 'dotenv';
import { CustomError } from '../../core/error/index.js';
import { MainModel } from '../shared/main-model.js';
import { validatePartialAboutSchema } from '../../core/schemas/about-schema.js';

dotenv.config();
const database = process.env.MONGO_DB;
const collection = 'about';

export class AboutModel extends MainModel {
  static async provideData() {
    const db = await super.connectToMongo({ db: database, collection });

    const [response] = await db.find().toArray();

    return response;
  }

  static async updateData(input) {
    const db = await super.connectToMongo({ db: database, collection });

    const { success, error } = validatePartialAboutSchema(input);

    if (success) {
      const [about] = await db.find().toArray();

      return await super.findByInAndUpdate(db, about._id, input);
    }

    throw new CustomError(400, error.message);
  }
}
