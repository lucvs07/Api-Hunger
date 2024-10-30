import mongoose from "mongoose";
// Schema -> Estrutura do Character
const characterSchema = new mongoose.Schema({ // criação de id único,
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    weapon: { type: String, required: true },
    house: { type: String, required: true },
    gender: { type: String, required: true },
    appearance: { type: String, required: true },
    img: { type: String, required: true },
}, {versionKey: false});

const Character = mongoose.model("characters", characterSchema);

export default Character;