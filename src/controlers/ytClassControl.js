import { GetYoutubeTitle } from "../services/getTitle.js";
import { YtClass } from "../models/ytClass.js";

export async function PostNewYtClass(request, response) {
  try {
    // Pucando url do meu request
    const { url } = request.body;

    // Verificado se já existe aula com URL existente
    const existentClass = await YtClass.findOne({ url });
    if (existentClass)
      return response.status(400).send({
        message: "Não foi possível adicionar aula! URL existente já arquivada!",
      });

    // Puxa o título do vídeo do YouTube
    const title = await GetYoutubeTitle(url);
    // Criando a aula
    const newClass = await YtClass.create({ ...request.body, title });
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
}