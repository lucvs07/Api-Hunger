import Character from "../models/Character.js"; // Importa o model Character

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
            res.status(500).send({message: error.message});
        }
    }
    // Método Post para criar um novo personagem
    static async postCharacter(req, res){
        try{
            const newCharacter = await Character.create(req.body);
            res.status(201).json({message: "Criado com sucesso", livro: newCharacter})
        } catch (error){
            res.status(500).send({message: `${error.message} - Falha ao Cadastrar Personagem`});
        }
    }

};

export default CharacterController; // Exporta o controller de personagens
