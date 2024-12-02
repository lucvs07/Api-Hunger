
import NaoEncontrado from "../erros/NaoEncontrado.js";
import { Character } from "../models/index.js"; // Importa o model Character
import { getDailyCharacter, getLastCharacter } from "./getDailyCharacter.js";

class CharacterController {
  // Método Get para listar todos os personagens
  static async getCharacters(req, res, next){
    try {
      const filter = {};
      // Retornar a lista de personagens em formato JSON
      const personagens = await Character.find(filter);
      console.log(personagens);
      res.status(200).json(personagens);
    } catch (error) {
      next(error);
    }
  }

  static async getCharacterById(req, res, next){
    try {
      const id = req.params.id;
      const personagem = await Character.findById(id);

      if (personagem !== null) {
        res.status(200).json(personagem);
      } else {
        next(new NaoEncontrado("Personagem não encontrado"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async getCharacterByFilter(req, res, next){
    try {
      const {name, occupation, weapon, house, gender, appearance} = req.query;
      const filter = {};
      if (name) filter.name = name;
      if (occupation) filter.occupation = occupation;
      if (weapon) filter.weapon = weapon;
      if (house) filter.house = house;
      if (gender) filter.gender = gender;
      if (appearance) filter.appearance = appearance;

      const characterByFilter = await Character.find(filter);
      res.status(200).json(characterByFilter);
    } catch (error) { 
      next(error);
    }
  }

  static async getDailyCharacter(req, res, next){
    try {
      const dailyCharacter = await getDailyCharacter();
      if (dailyCharacter){
        res.status(200).json(dailyCharacter);
      } else {
        next(new NaoEncontrado("Personagem não encontrado"));
      }
    } catch (error) {
      next(error);  
    }
  };
  static async getLastCharacter(req, res, next){
    try {
      const lastCharacter = await getLastCharacter();
      if (lastCharacter){
        res.status(200).json(lastCharacter);
      } else {
        next(new NaoEncontrado("Personagem não encontrado"));
      }
    } catch (error){
      next(error);
    }
  }
  // Método Post para criar um novo personagem
  static async postCharacter(req, res, next){
    try{
      const newCharacter = await Character.create(req.body);
      res.status(201).json({message: "Criado com sucesso", Personagem: newCharacter});
    } catch (error){
      next(error);
    }
  }

  // Método Put para atualizar um personagem
  static async putCharacterById(req, res, next){
    try {
      const id = req.params.id;
      const updateCharacter = await Character.findByIdAndUpdate(id,
        {
          name: req.body.name,
          occupation: req.body.occupation,
          weapon: req.body.weapon,
          house: req.body.house,
          gender: req.body.gender,
          appearance: req.body.appearance,
          img: req.body.img
        },
        {
          new: true,
          runValidators: true
        }
      );
      if (!updateCharacter) {
        next(new NaoEncontrado("Personagem não encontrado"));
      }
      res.status(200).json({message: "Personagem Atualizado com Sucesso", Personagem: updateCharacter});

    } catch (error) {
      next(error);
    }
  }
  // Método Delete para deletar um personagem
  static async deleteCharacterById(req, res, next){
    try {
      const id = req.params.id;
      const deleteCharacter = await Character.findByIdAndDelete(id);
      if (!deleteCharacter) {
        next(new NaoEncontrado("Personagem não encontrado"));
      }
      res.status(200).json({message: "Personagem Deletado com Sucesso"});

    } catch (error) {
      next(error);
    }
  }

};

export default CharacterController; // Exporta o controller de personagens
