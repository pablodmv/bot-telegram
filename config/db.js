const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado a la Base de datos");
  } catch (error) {
    console.log("Se ha producido un error");
    console.log(error);
  }
};

module.exports = connectDB;
