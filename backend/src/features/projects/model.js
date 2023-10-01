import dotenv from 'dotenv';
import { MainModel } from '../shared/main-model.js';
import { ObjectId } from 'mongodb';
import { CustomError } from '../../core/error/index.js';
import {
  validatePartialProjectSchema,
  validateProjectImageSchema,
  validateProjectSchema,
} from '../../core/schemas/project-schema.js';

dotenv.config();
const database = process.env.MONGO_DB;
const collection = 'projects';

export class ProjectsModel extends MainModel {
  static async provideData() {
    const db = await super.connectToMongo({ db: database, collection });

    const allProjects = await db.find().toArray();

    return allProjects.map((project) => {
      return {
        id: project._id,
        mainImage: project.mainImage,
        name: project.name,
        year: project.year,
      };
    });
  }

  static async provideProjectById(id) {
    const db = await super.connectToMongo({ db: database, collection });

    return await super.getElementById(db, id);
  }

  static async provideProjectsByTop(top) {
    const db = await super.connectToMongo({ db: database, collection });

    const query = { top: top === 'true' ? true : false };

    const projectsFiltered = await super.getElementByQuery(db, query);

    return projectsFiltered.map((project) => {
      return {
        id: project._id,
        mainImage: project.mainImage,
        name: project.name,
        year: project.year,
        description: project.description,
      };
    });
  }

  static async createNewProject(input) {
    const db = await super.connectToMongo({ db: database, collection });

    const { success, error } = validateProjectSchema(input);

    if (success) {
      const { insertedId } = await db.insertOne(input);

      return await db.findOne({ _id: new ObjectId(insertedId) });
    }

    throw new CustomError(400, error.message);
  }

  static async updateProject(input, id) {
    const db = await super.connectToMongo({ db: database, collection });

    const { success, error } = validatePartialProjectSchema(input);

    if (success) {
      return await super.findByInAndUpdate(db, id, input);
    }

    throw new CustomError(400, error.message);
  }

  static async updateMainImage(id, image) {
    const db = await super.connectToMongo({ db: database, collection });

    const input = { mainImage: image };

    const { success, error } = validateProjectImageSchema(input);

    if (success) {
      return await super.findByInAndUpdate(db, id, input);
    }

    throw new CustomError(400, error.message);
  }

  static async deleteProject(id) {
    const db = await super.connectToMongo({ db: database, collection });

    return await super.findByIdAndDelete(db, id);
  }
}
