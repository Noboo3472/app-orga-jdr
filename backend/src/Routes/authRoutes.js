import express from 'express';
import creerCompteController from '../controllers/authController.js';

const router = express.Router();

router.post('/inscription', creerCompteController);

export default router;