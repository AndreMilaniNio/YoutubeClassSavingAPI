import mongoose from "mongoose";

const ytClassSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  discipline: {
    type: String,
    enum: [
      // Linguagens de Programação
      "JavaScript",
      "TypeScript",
      "Python",
      "Java",
      "C",
      "C++",
      "C#",
      "Go",
      "PHP",
      "Ruby",
      "Rust",
      "Kotlin",
      "Swift",

      // Web & Frameworks
      "Node.js",
      "React",
      "Next.js",
      "Vue.js",
      "Angular",
      "Express",
      "Fastify",
      "NestJS",

      // Banco de Dados
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "SQLite",
      "Redis",
      "Firebase",

      // DevOps / Ferramentas
      "Git",
      "GitHub",
      "Docker",
      "Kubernetes",
      "Linux",

      // Cloud
      "AWS",
      "Azure",
      "Google Cloud",

      // Mobile
      "React Native",
      "Flutter",

      // Outros essenciais
      "HTML",
      "CSS",
      "Sass",
      "TailwindCSS",
    ],
    required: true,
  },
  url: { type: String, required: true },
  language: {
    type: String,
    enum: ["Português", "Inglês", "Espanhol"],
    required: true,
  },
  author: { type: String, required: false },
});

export const YtClass = mongoose.model("YtClass", ytClassSchema);
