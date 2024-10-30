// Importar a biblioteca express
import express from 'express';

// Criar uma instância do express
const app = express();

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
app.get("/", (req, res) => {
    res.status(200).send("Bem vindo a API Hunger Games");
});

app.get("/personagens", (req, res) => {
    // Retornar a lista de personagens em formato JSON
    res.status(200).json(personagens);
});

export default app;