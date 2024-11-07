import Character from "../models/Character.js"; // Importa o model Character
import { getDailyCharacter, getLastCharacter } from "./getDailyCharacter.js";

class CharacterController {
  // Método Get para listar todos os personagens
  static async getCharacters(req, res){
    try {
      const filter = {};
      // Retornar a lista de personagens em formato JSON
      const personagens = await Character.find(filter);
      console.log(personagens);
      res.status(200).json(personagens);
    } catch (error) {
      res.status(500).json({message: `${error.message} - Falha ao Buscar os Personagens`});
    }
  }

  static async getCharacterById(req, res){
    try {
      const id = req.params.id;
      const personagem = await Character.findById(id);
      res.status(200).json(personagem);

    } catch (error) {
      res.status(500).json({message: `${error.message} - Falha ao Buscar Personagem`});

    }
  }
  static async getCharacterByDistrict(req, res){
    const districtQuery = req.query.district;
    try {
      const characterByDistrict = await Character.find({house: districtQuery});
      res.status(200).json(characterByDistrict);

    } catch (error) {
      res.status(500).json({message: `${error.message} - Falha ao Buscar Personagem`});
    }
  }
  static async getDailyCharacter(req, res){
    try {
      const dailyCharacter = await getDailyCharacter();
      if (dailyCharacter){
        res.status(200).json(dailyCharacter);
      } else {
        res.status(404).json({message: "Nenhum personagem encontrado"});
      }
    } catch (error) {
      res.status(500).json({message: `${error.message} - Falha ao Buscar Personagem do Dia`});
    }
  };
  static async getLastCharacter(req, res){
    try {
      const lastCharacter = await getLastCharacter();
      if (lastCharacter){
        res.status(200).json(lastCharacter);
      } else {
        res.status(404).json({message: "Nenhum personagem encontrado"});
      }
    } catch (error){
      res.status(500).json({message: `${error.message} - Falha ao Buscar Último Personagem`});
    }
  }
  // Método Post para criar um novo personagem
  static async postCharacter(req, res){
    try{
      const newCharacter = await Character.create(req.body);
      res.status(201).json({message: "Criado com sucesso", Personagem: newCharacter});
    } catch (error){
      res.status(500).json({message: `${error.message} - Falha ao Cadastrar Personagem`});
    }
  }

  // Método Put para atualizar um personagem
  static async putCharacterById(req, res){
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
        res.status(404).json({message: "Personagem não encontrado"});
      }
      res.status(200).json({message: "Personagem Atualizado com Sucesso", Personagem: updateCharacter});

    } catch (error) {
      res.status(500).json({message: `${error.message} - Falha ao Atualizar Personagem`});

    }
  }
  // Método Delete para deletar um personagem
  static async deleteCharacterById(req, res){
    try {
      const id = req.params.id;
      const deleteCharacter = await Character.findByIdAndDelete(id);
      if (!deleteCharacter) {
        res.status(404).json({message: "Personagem não encontrado"});
      }
      res.status(200).json({message: "Personagem Deletado com Sucesso"});

    } catch (error) {
      res.status(500).json({message: `${error.message} - Falha ao Deletar Personagem`});

    }
  }

};

export default CharacterController; // Exporta o controller de personagens
