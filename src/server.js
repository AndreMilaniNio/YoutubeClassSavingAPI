// Importando o Dotenv
import { ConnectMongo } from "./mongodb.js";
import { app } from "./app.js";
import chalk from "chalk";
import "dotenv/config";

// Iniciando o servidor
async function Server() {
  const { HOST, PORT } = process.env;

  try {
    ConnectMongo();

    const host = HOST || "127.0.0.1";
    const port = PORT || 3000;

    app.listen({ host, port }).then(() => {
      console.log(chalk.green(`API on!`));
    });
  } catch (error) {
    console.error(chalk.red("Falha ao iniciar o servidor:", error));
  }
}

// Chamando o servidor (Pra rodar por causa dele ser uma função)
Server();
