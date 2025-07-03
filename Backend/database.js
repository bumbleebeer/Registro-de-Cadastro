import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const database = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});


// Validar se conseguiu se conectar ao banco
database.connect((erro) => {
  if (erro) {
    console.error("Erro ao se conectar ao banco:", erro.message);
    return;
  }
  console.log("Conectado ao banco do dados com sucesso !");
});

