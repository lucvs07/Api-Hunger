// Importar a biblioteca express
import express from "express";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
// Importar a função dbConnect -> Conectar MongoDB
import dbConnect from "./config/dbConnect.js";
import routes from "./routes/index.js";

const connection = await dbConnect();

connection.on("error", (erro) => {
  console.log(`Erro ao conectar ao MongoDB: ${erro}`);
}); 

connection.once("open", () => {
  console.log("Conexão estabelecida com sucesso!");
});

// Criar uma instância do express
const app = express();
routes(app);

// Middleware para tratar erros
app.use(manipuladorDeErros);


export default app;