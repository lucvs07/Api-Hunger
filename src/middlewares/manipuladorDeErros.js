import mongoose from "mongoose";
// eslint-disable-next-line no-unused-vars
function manipuladorDeErrors(erro, req, res, next){
  if (erro instanceof mongoose.Error.CastError) {
    res.status(400).json({message: "ID inválido"});
  } else if (erro instanceof mongoose.Error.ValidationError) {
    const mensagensErro = Object.values(erro.errors)
      .map(erro => erro.message)
      .join("; ");

    res.status(400).json({message: `Erros de Validação encontrados: ${mensagensErro}`});  
  } else {
    res.status(500).json({message: `${erro.message} - Falha ao Buscar Personagem`});
  }
}
export default manipuladorDeErrors;