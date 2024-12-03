import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

async function paginar(req, res, next){
  try{
    let {limite = 5, pagina = 1, ordenar = "house:1"} = req.query;
    let [campo, ordem] = ordenar.split(":");
    limite = parseInt(limite);
    pagina = parseInt(pagina);
    ordem = parseInt(ordem);

    const resultado = req.resultado;

    if (limite > 0 && pagina > 0){
      const filter = {};
      // Retornar a lista de personagens em formato JSON
      const resultadoPaginado = await resultado.find(filter)
        .sort({[campo]: ordem})
        .skip((pagina - 1) * limite)
        .limit(limite)
        .exec();
      res.status(200).json(resultadoPaginado);
    } else {
      next(new RequisicaoIncorreta());
    }

  } catch (error){
    next(error);
  }
};

export default paginar;