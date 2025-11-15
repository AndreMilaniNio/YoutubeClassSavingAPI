import axios from "axios";
import "dotenv/config";

// Função para pegar Título do vídeo
export async function GetYoutubeVideoInformation(url) {
  try {
    const videoId = ExtractVideoId(url);
    const apiKey = process.env.YOUTUBE_API_KEY;

    // Se a url for inválida
    if (!videoId) {
      throw new Error("URL inválida: não foi possível extrair o ID do vídeo.");
    }

    // Se a chave da API não estiver configurada
    if (!process.env.YOUTUBE_API_KEY) {
      throw new Error("Chave da API YouTube não configurada.");
    }

    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;
    const response = await axios.get(apiUrl);

    // Pegando dados do vídeo com a resposta do GET acima
    const title = response.data.items[0]?.snippet?.title;
    const channelName = response.data.items[0]?.snippet?.channelTitle;
    const thumbnail = response.data.items[0]?.snippet?.thumbnails;

    // Selecionando as melhores thumbs (troca para menor definição caso não ache a melhor)
    const bestThumbnail =
      thumbnail?.maxres?.url ||
      thumbnail?.high?.url ||
      thumbnail?.medium?.url ||
      thumbnail?.default?.url;

    return {
      title: title || "Título não encontrado",
      channel: channelName || "Canal não encontrado",
      thumbnail: bestThumbnail || "URL_da_imagem_default_aqui",
    };
  } catch (error) {
    throw new Error("Erro ao buscar informações do vídeo: " + error.message);
  }
}

// Função para achar vídeo da url
function ExtractVideoId(url) {
  const regex = /(?:v=|\/)([0-9A-Za-z_-]{11})(?:\?|&|$)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}
