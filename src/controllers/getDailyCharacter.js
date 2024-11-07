import Character from "../models/Character.js";

const getDailyCharacter = async (req, res) => {
  try {
    // Verificar se há personagem no banco de dados
    const countCharacters = await Character.countDocuments();
    if (countCharacters === 0) {
      return res.status(404).json({message: "Nenhum personagem encontrado"});
    }

    // Definir o horário para realizar a mudança de personagem
    const dateNow = new Date(); // Data atual em UTC
    const hourChange = 11; // Horário para mudança de personagem
    const minuteChange = 59; // Minuto para mudança de personagem
    const secondsChange = 59; // Segundo para mudança de personagem

    // Alterar o horário para o horário da mudança
    const timeChange = new Date(Date.UTC(
      dateNow.getFullYear(),
      dateNow.getMonth(),
      dateNow.getDate(),
      hourChange, minuteChange, secondsChange, 0
    ));

    // Verifcar se a data atual é anterior a data de mudança
    if (dateNow < timeChange){
      timeChange.setUTCDate(timeChange.getUTCDate() - 1);
    }

    // Buscar o personagem do dia
    const dailyCharacter = await Character.findOne({lastSelectedDate: {$gte: timeChange}});
    if (dailyCharacter) {
      return dailyCharacter;
    }

    // Contar quantos personagens não estão selecionados
    const countCharactersNotSelected = await Character.countDocuments({isSelected: false});
    if (countCharactersNotSelected === 0) {
      // Atualizar todos os personagens para não selecionados
      await Character.updateMany({}, {isSelected: false});
    }

    // Buscar um personagem de forma aleatória
    const randomCharacter = await Character.findOne({isSelected: false}).skip(Math.floor(Math.random() * countCharactersNotSelected));
    if (randomCharacter) {
      // Atualizar o personagem selecionado
      randomCharacter.isSelected = true;
      randomCharacter.lastSelectedDate = dateNow;
      await randomCharacter.save();
    }
    return randomCharacter;

  } catch (error) {
    res.status(500).json({message: `${error.message} - Falha ao Buscar Personagem do Dia`});
  }
};

const getLastCharacter = async (req, res) => {
  try {
    // Definir o horário para realizar a mudança de personagem
    const dateNow = new Date(); // Data atual em UTC
    const hourChange = 11; // Horário para mudança de personagem
    const minuteChange = 59; // Minuto para mudança de personagem
    const secondsChange = 59; // Segundo para mudança de personagem

    // Alterar o horário para o horário da mudança
    const timeChange = new Date(Date.UTC(
      dateNow.getFullYear(),
      dateNow.getMonth(),
      dateNow.getDate(),
      hourChange, minuteChange, secondsChange, 0
    ));

    // Verifcar se a data atual é anterior a data de mudança
    if (dateNow < timeChange){
      timeChange.setUTCDate(timeChange.getUTCDate() - 1);
    }

    // Buscar o último personagem selecionado no banco de dados -> a partir da data de mudança
    const lastCharacter = await Character.findOne({lastSelectedDate: {$lt: timeChange}}).sort({lastSelectedDate: -1});
    return lastCharacter;
  } catch (error) {
    res.status(500).json({message: `${error.message} - Falha ao Buscar Último Personagem`});
  }
};

export { getDailyCharacter, getLastCharacter };