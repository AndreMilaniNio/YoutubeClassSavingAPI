import {
  DeleteYtClass,
  GetYtClasses,
  PostNewYtClass,
  PatchYtClass
} from "../controllers/ytClassControl.js";

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

  // Postar aulas
  app.post("/ytclass", PostNewYtClass);

  // Listar aulas
  app.get("/ytclass", GetYtClasses);

  // Deletar aulas
  app.delete("/ytclass/:id", DeleteYtClass);

  app.patch("/ytclass/:id", PatchYtClass)
};
