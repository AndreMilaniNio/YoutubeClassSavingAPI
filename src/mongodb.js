import mongoose from "mongoose";
import chalk from "chalk";
import "dotenv/config";

export async function ConnectMongo() {
  const { MONGO_URL, MONGO_DATABASE_NAME } = process.env;

  // Se eu não tiver os itens para montar minha URI
  if (!MONGO_URL || !MONGO_DATABASE_NAME) {
    return console.error(
      chalk.red("Variáveis de ambiente do MongoDB ausentes. Verifique seu .env")
    );
  }

  // Montando a URI
  const uri = `${MONGO_URL}${MONGO_DATABASE_NAME}`;

  try {
    await mongoose.connect(uri);
    console.log(chalk.yellow("Conectado ao MongoDB"));
  } catch (error) {
    console.error(chalk.red("Sua conexão falhou. Erro:", error.message));
  }
}
