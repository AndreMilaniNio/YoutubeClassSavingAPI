// Importando fastify
import fastify from 'fastify'
import { Routes } from './routes/routes.js'

// Instanciando fastify
const app = fastify()

// Registra todas as rotas no app
app.register(Routes)

// Exportando o app
export { app }