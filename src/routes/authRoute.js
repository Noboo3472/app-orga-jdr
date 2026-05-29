//route inscription, login et logout
import express from 'express';
import {register, login, logout} from '../controllers/authController.js';

const router = express.Router();

//Route pour s'inscrire
router.post('/register', register);
//Route pour se connecter
router.post('/login', login);
//Route pour se déconnecter
router.post('/logout', logout);

export default router;

