
import app from "./src/app.js";

const PORT = 3000; // Porta que o servidor irá escutar


// Chamar o servidor para escutar a porta 3000
app.listen(PORT,() => {
    console.log(`Servidor rodando na porta ${PORT}`)
})