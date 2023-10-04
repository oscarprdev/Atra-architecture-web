import { MongoClient, ServerApiVersion } from 'mongodb';
import { projectSeed } from './projects-seed.js';
import { DB_URL } from '../constants/database-url.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: { type: String, required: true },
  year: { type: String, required: true },
  description: { type: String, required: true, default: undefined },
  mainImage: { type: String, required: true },
  images: [{ type: String, required: true }],
  top: { type: Boolean, required: true, default: false }
});

const Project = mongoose.model('Project', projectSchema);

const db = process.env.MONGO_DB;
const projectsDocument = projectSeed.map((project) => new Project(project));

const client = new MongoClient(DB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

const creationSeed = async () => {
  try {
    await client.connect();
    const database = client.db(db);
    const collection = database.collection('projects');
    collection.drop();
    collection.insertMany(projectsDocument);
    console.log('Projects seed collection created');
  } catch (e) {
    console.log(e);
  }
};

creationSeed();
