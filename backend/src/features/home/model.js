import dotenv from 'dotenv';
import { MainModel } from '../shared/main-model.js';
import { CustomError } from '../../core/error/index.js';
import { z } from 'zod';

const homeSchema = z.object({
  title: z.string({
    invalid_type_error: 'Home title must be a string',
    required_error: 'Home title is required.',
  }),
  subtitle: z.string({
    invalid_type_error: 'Home subtitle must be a string',
    required_error: 'Home subtitle is required.',
  }),
});

function validateHomeSchema(input) {
  return homeSchema.safeParse(input);
}

function validatePartialHomeSchema(input) {
  return homeSchema.partial().safeParse(input);
}

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
