// Importar a biblioteca express
import express from 'express';

// Criar uma instância do express
const app = express();

// req -> requisição (request)
// res -> resposta (response)
app.get("/", (req, res) => {
    res.status(200).send("Bem vindo a API Hunger Games");
});

export default app;