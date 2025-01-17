import express from 'express'
import { connectDb, client }  from './config/ConnectDb.js'
import signInRouter from './routes/Auth.js';
import cors from 'cors'
import dotenv from 'dotenv'
import Authentification from './middleware/authenticatedUser.js';
import getProfile from './controllers/getProfile.js';
import cookieParser from 'cookie-parser';
import getUsersList from './controllers/getUsersList.js'
dotenv.config()

// console.log('Mongo URI:', process.env.MONGO_URI);  // Should print the Mongo URI from .env
// console.log('Secret Key:', process.env.SECRET_KEY);
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(cookieParser())
app.get('/api', (req, res) => {
  res.send('API is running');
});

app.get('/api/profile/:username', Authentification, getProfile)

app.get('/api/users', Authentification, getUsersList)

app.listen(PORT, () => {
	connectDb();
	app.use('/api/auth', signInRouter);
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
