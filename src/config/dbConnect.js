import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const URL_MONGO = process.env.URL_MONGO;
async function dbConnect() {
  mongoose.connect(URL_MONGO);
  return mongoose.connection;
}
export default dbConnect;