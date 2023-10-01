import dotenv from 'dotenv';

dotenv.config();
const USER = process.env.MONGO_USER;
const PASSWORD = process.env.MONGO_PASSWORD;

export const DB_URL = `mongodb+srv://${USER}:${PASSWORD}@cluster0.sod8s.mongodb.net/?retryWrites=true&w=majority`;
