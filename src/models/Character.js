import mongoose from "mongoose";
import requireMessage from "../middlewares/requireMessage.js";
// Schema -> Estrutura do Character
const characterSchema = new mongoose.Schema({ // criação de id único,
  name: { 
    type: String,
    required: [true, requireMessage("Name")] },
  occupation: { 
    type: [String], 
    required: [true, requireMessage("Occupation")] },
  weapon: { 
    type: [String], 
    required: [true, requireMessage("Weapon")] },
  house: { 
    type: String, 
    required: [true, requireMessage("House")] },
  gender: { 
    type: String, 
    required: [true, requireMessage("Gender")] },
  appearance: { 
    type: String, 
    required: [true, requireMessage("Appearance")] },
  img: { 
    type: String, 
    required: [true, requireMessage("IMG")] },
  isSelected: { type: Boolean, default: false },
  lastSelectedDate: { type: Date, default: null }
}, {versionKey: false});

const Character = mongoose.model("characters", characterSchema);

export default Character;