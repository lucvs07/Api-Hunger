import express from 'express';
import CharacterController from '../controllers/characterController.js';

const routes = express.Router();

// Rota para listar todos os personagens
routes.get("/characters", CharacterController.getCharacters);

export default routes;