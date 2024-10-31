
import app from "./src/app.js";
import dotenv from "dotenv";
import axios from "axios";
import { set } from "mongoose";

dotenv.config();

const PORT = process.env.PORT; // Porta que o servidor irá escutar

// Chamar o servidor para escutar a porta 3000
app.listen(PORT,() => {
    console.log(`Servidor rodando na porta ${PORT}`)
})

// Função para manter api no ar
const keepAlive = async () => {
    axios.get(process.env.API)
        .then(() => console.log("API no ar"))
        .catch((error) => console.log("Erro ao manter API no ar: ", error.message));
};

setInterval(keepAlive, 7 * 60 * 1000); // Chamar a função a cada 13 minutos