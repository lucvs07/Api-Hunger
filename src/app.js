// Importar a biblioteca express
import express from 'express';

// Criar uma instância do express
const app = express();
// Middleware para o express entender JSON
app.use(express.json());

const personagens = [
    {
        id: 1,
        nome: "Katniss Everdeen",
    },
    {
        id: 2,
        nome: "Peeta Mellark",
    }
];

// req -> requisição (request)
// res -> resposta (response)

// Rotas GET
app.get("/", (req, res) => {
    res.status(200).send("Bem vindo a API Hunger Games");
});

app.get("/personagens", (req, res) => {
    // Retornar a lista de personagens em formato JSON
    res.status(200).json(personagens);
});

// Rotas POST
app.post("/personagens", (req, res) => {
    // req.body -> corpo da requisição
    personagens.push(req.body);
    res.status(201).send(`Personagem: ${req.body.nome} criado com sucesso`);
});

export default app;