import express from 'express';
import { AuthController } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/signup', AuthController.signup);
authRouter.post('/login', AuthController.login);


export default authRouter;