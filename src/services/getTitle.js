import axios from "axios";
import "dotenv/config";

// Função para pegar Título do vídeo
export async function GetYoutubeTitle(url) {
  const videoId = ExtractVideoId(url);
  const apiKey = process.env.YOUTUBE_API_KEY;

  const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;
  const response = await axios.get(apiUrl);

  const title = response.data.items[0]?.snippet?.title;
  return title || "Título não encontrado!";
}

// Função para achar vídeo da url
function ExtractVideoId(url) {
  const regex = /(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}