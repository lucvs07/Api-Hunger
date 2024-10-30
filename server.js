
import app from "./src/app.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT; // Porta que o servidor irá escutar


// Chamar o servidor para escutar a porta 3000
app.listen(PORT,() => {
    console.log(`Servidor rodando na porta ${PORT}`)
})