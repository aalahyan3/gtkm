import express, {Router}  from 'express';
import { signIn, signUp } from '../controllers/Auth.js';


const signInRouter = express.Router();
signInRouter.post('/login', signIn);
signInRouter.post('/signup', signUp);

export default signInRouter;
