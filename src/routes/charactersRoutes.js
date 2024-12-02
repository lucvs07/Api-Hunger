import express from "express";
import CharacterController from "../controllers/characterController.js";

const routes = express.Router();

// Rotas GET
routes.get("/characters/daily", CharacterController.getDailyCharacter);
routes.get("/characters/last", CharacterController.getLastCharacter);
routes.get("/characters", CharacterController.getCharacters);
routes.get("/characters/search", CharacterController.getCharacterByFilter);
routes.get("/characters/:id", CharacterController.getCharacterById);

// Rotas POST
routes.post("/characters", CharacterController.postCharacter);

// Rotas PUT
routes.put("/characters/:id", CharacterController.putCharacterById);

// Rotas DELETE
routes.delete("/characters/:id", CharacterController.deleteCharacterById);
export default routes;