import dotenv from 'dotenv';
import { MainModel } from '../shared/main-model.js';
import { validateContactSchema } from '../../core/schemas/contact-schema.js';
import { CustomError } from '../../core/error/index.js';

dotenv.config();
const database = process.env.MONGO_DB;
const collection = 'contact';

export class ContactModel extends MainModel {
  static async provideContactImage() {
    const db = await super.connectToMongo({ db: database, collection });

    const [response] = await db.find().toArray();

    return response.image;
  }

  static async updateContactImage(image) {
    const db = await super.connectToMongo({ db: database, collection });
    const { success, error } = validateContactSchema(image);

    if (success) {
      const [contact] = await db.find().toArray();

      return await super.findByInAndUpdate(db, contact._id, input);
    }

    throw new CustomError(400, error.message);
  }
}
