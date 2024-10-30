// Importar a biblioteca express
import express from 'express';
// Importar a função dbConnect -> Conectar MongoDB
import dbConnect from './config/dbConnect.js';
// Importar o model Character
import Character from './models/Character.js';

const connection = await dbConnect();

connection.on("error", (erro) => {
    console.log(`Erro ao conectar ao MongoDB: ${erro}`);
}); 

connection.once("open", () => {
    console.log("Conexão estabelecida com sucesso!");
});

// Criar uma instância do express
const app = express();
// Middleware para o express entender JSON
app.use(express.json());

// req -> requisição (request)
// res -> resposta (response)

// Rotas GET
// Rota raiz
app.get("/", (req, res) => {
    res.status(200).send("Bem vindo a API Hunger Games");
});
// Rota para listar todos os personagens
app.get("/personagens", async (req, res) => {
    try {
        const filter = {};
        // Retornar a lista de personagens em formato JSON
        const personagens = await Character.find(filter);
        res.status(200).send(personagens);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
    
});
// Rota para listar um personagem específico
app.get("/personagens/:id", (req, res) => {
    const personagem = getPersonagemById(parseInt(req.params.id));
    res.status(200).json(personagem);

});

// Rotas POST
app.post("/personagens", (req, res) => {
    // req.body -> corpo da requisição
    personagens.push(req.body);
    res.status(201).send(`Personagem: ${req.body.nome} criado com sucesso`);
});

// Rotas PUT
app.put("/personagens/:id", (req, res) => {
    const personagem = getPersonagemById(parseInt(req.params.id));
    personagem.nome = req.body.nome;
    res.status(200).json(personagens);
})

// Rotas DELETE
app.delete("/personagens/:id", (req, res) => {
    const personagem = getPersonagemById(parseInt(req.params.id));
    const index = personagens.indexOf(personagem);
    personagens.splice(index, 1);
    res.status(200).send(`Personagem: ${personagem.nome} deletado com sucesso`);
})

export default app;