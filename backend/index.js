import dotenv from 'dotenv';
import { initializeServer } from './src/app.js';

dotenv.config();
const PORT = process.env.PORT;

initializeServer(PORT);
