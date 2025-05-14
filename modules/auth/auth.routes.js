import express from 'express';
import {auth} from '../../shared/middlewares/auth.middleware.js';
import { postLogin, postRegistration, resetPassword } from './auth.controller.js';
const router = express.Router();

router.post('/register',postRegistration);

router.post('/login',postLogin);

router.put('/resetpassword', auth, resetPassword);



export default router;