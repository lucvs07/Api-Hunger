// Importando o módulo http -> protocolo de transferência de hipertexto
import http from "http";

const PORT = 3000; // Porta que o servidor irá escutar

// Criando um servidor http
// req -> requisição (request)
// res -> resposta (response)
const server = http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Api Hunger Games");
})

// Chamar o servidor para escutar a porta 3000
server.listen(PORT,() => {
    console.log(`Servidor rodando na porta ${PORT}`)
})