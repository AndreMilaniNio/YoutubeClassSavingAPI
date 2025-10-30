import { PostNewYtClass } from "../controlers/ytClassControl.js";

// Exportando rotas
export const Routes = (app) => {
  app.get("/", (_, res) => {
    res.status(200).send({ message: "API rodando." });
  });

  app.get("/easter", (_, res) => {
    res
      .status(200)
      .send({ message: "Você encontrou um Easter Egg! Parabéns! 🥚" });
  });

  app.post("/ytclass", PostNewYtClass);
};
