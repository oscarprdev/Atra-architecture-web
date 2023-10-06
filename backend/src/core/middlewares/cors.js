import cors from 'cors';

const ACCEPTED_ORIGINS = [
  'https://atra-architecture-frontend.vercel.app',
  'http://localhost:5173',
  'http://localhost:1234',
  'http://localhost:4321'
];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (acceptedOrigins.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    }
  });
