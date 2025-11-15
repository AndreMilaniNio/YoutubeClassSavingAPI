import { GetYoutubeVideoInformation } from "../services/getVideoInformation.js";
import { YtClass } from "../models/ytClass.js";

// POST (CRIAR NOVA AULA)
export async function PostNewYtClass(request, response) {
  try {
    // Puxando url do meu request
    const { url } = request.body;

    // Verificado se já existe aula com URL existente
    const existentClass = await YtClass.findOne({ url });
    if (existentClass)
      return response.status(400).send({
        message: "Não foi possível adicionar aula! URL existente já arquivada!",
      });

    // Puxa o título do vídeo do YouTube
    const { title, channel, thumbnail } = await GetYoutubeVideoInformation(url);
    // Criando a aula (Somente o author tem o chanel com : pq o nome vem diferente da função acima)
    const newClass = await YtClass.create({
      ...request.body,
      title,
      thumbnail,
      author: channel,
    });

    // Resposta de resultado
    return response
      .status(201)
      .send({ message: "Aula nova inserida!", aula: newClass });
  } catch (error) {
    // Em caso de erro:
    return response
      .status(400)
      .send({ message: "Erro ao criar nova aula!", error: error.message });
  }
}

// GET (PUXAR AULAS DO BANCO - TODAS)
export async function GetYtClasses(request, response) {
  try {
    const ytClasses = await YtClass.findOne();
    if (!ytClasses) {
      return response.status(400).send({ message: "Aulas não encontradas" });
    }
    return response.status(200).send({ classes: ytClasses });
  } catch (error) {
    return response
      .status(400)
      .send({ message: "Erro ao criar nova aula!", error: error.message });
  }
}

export async function DeleteYtClass(request, response) {
  try {
    const { id } = request.params;
    const classToDelete = await YtClass.findByIdAndDelete(id);

    return response.status(200).send({ deletedClass: classToDelete });
  } catch (error) {
    response
      .status(400)
      .send("Não foi possível deletar a aula, error: " + error.message);
  }
}
