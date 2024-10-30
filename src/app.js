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

function getPersonagemById(id) {
    return personagens.find(personagen => personagen.id === id);
}

// req -> requisição (request)
// res -> resposta (response)

// Rotas GET
// Rota raiz
app.get("/", (req, res) => {
    res.status(200).send("Bem vindo a API Hunger Games");
});
// Rota para listar todos os personagens
app.get("/personagens", (req, res) => {
    // Retornar a lista de personagens em formato JSON
    res.status(200).json(personagens);
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