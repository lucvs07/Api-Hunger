// Importando o módulo http -> protocolo de transferência de hipertexto
import http from "http";

const PORT = 3000; // Porta que o servidor irá escutar

// Rotas da API
const rotas  = {
    "/" : "Bem vindo a API Hunger Games",
    "/personagens" : "Lista de personagens",
    "/daily" : "Detalhes do personagem diário",
};

// Criando um servidor http
// req -> requisição (request)
// res -> resposta (response)
const server = http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "text/plain"});
    // req.url -> rota que o usuário está acessando
    res.end(rotas[req.url] || "Rota não encontrada");
})

// Chamar o servidor para escutar a porta 3000
server.listen(PORT,() => {
    console.log(`Servidor rodando na porta ${PORT}`)
})