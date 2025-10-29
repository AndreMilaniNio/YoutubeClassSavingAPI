import { YtClass } from "../models/ytClass.js";

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

  app.post("/ytclass", async (request, response) => {
    try {
      // Pucando url do meu request
      const { url } = request.body;

      // Verificado se já existe aula com URL existente
      const existentClass = await YtClass.findOne({ url });
      if (existentClass)
        return response
          .status(400)
          .send({message: "Não foi possível adicionar aula! URL existente já arquivada!"});

      // Criando a aula
      const newClass = await YtClass.create(request.body);
      // Resposta de resultado
      response
        .status(201)
        .send({ message: "Aula nova inserida!", aula: newClass });
    } catch (error) {
      // Em caso de erro:
      response
        .status(400)
        .send({ message: "Erro ao criar nova aula!", error: error.message });
    }
  });
};
