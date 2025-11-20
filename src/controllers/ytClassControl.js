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
    response
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
    return response
      .status(200)
      .send({ message: "Todas as aulas listadas: ", classes: ytClasses });
  } catch (error) {
    response
      .status(400)
      .send({ message: "Erro ao criar nova aula!", error: error.message });
  }
}

// DELETE (Deleta uma aula específica!)
export async function DeleteYtClass(request, response) {
  try {
    const { id } = request.params;
    const classToDelete = await YtClass.findByIdAndDelete(id);

    return response
      .status(200)
      .send({ message: "Aula deletada!", deletedClass: classToDelete });
  } catch (error) {
    response
      .status(400)
      .send("Não foi possível deletar a aula, error: " + error.message);
  }
}

// PATCH (Atualiza os dados de uma aula)
export async function PatchYtClass(request, response) {
  try {
    // Pegando os parametros da req e o body que vem junto
    const { id } = request.params;
    const toModifyData = request.body;

    // Verificado se já existe aula com URL existente
    const existentClass = await YtClass.findById(id);
    if (!existentClass)
      // Se não existir ele me retorna que não existe
      return response.status(404).send({
        message: "Aula não encontrada.",
      });

    // Criando variável para poder escrever por cima dos dados para modificar
    let finalData = { ...toModifyData };

    if (toModifyData.url && toModifyData.url !== existentClass.url) {
      // Chama o serviço do YouTube
      const ytInfo = await GetYoutubeVideoInformation(toModifyData.url);

      // Atualizando todos os campos baseados na nova URL
      finalData = {
        // Reescrevendo com o que voltou da função acima
        ...finalData,
        title: ytInfo.title,
        thumbnail: ytInfo.thumbnail,
        author: ytInfo.channel,
      };
    }

    // Dando update com os novos dados!
    const updatedClass = await YtClass.findByIdAndUpdate(id, finalData, {
      new: true,
    });

    // Retornando resposta
    return response
      .status(200)
      .send({ message: "Aula modificada!", modifiedClass: updatedClass });
  } catch (error) {
    response
      .status(400)
      .send(
        "Não foi possível alterar os dados da aula, error: " + error.message
      );
  }
}
