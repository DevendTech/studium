import fastify from 'fastify'
import fastifyFormbody from '@fastify/formbody'
import adminRoutes from './routes/RegisterAdminRoute.js'
import cors from '@fastify/cors'
import banco from './bd.js'
import loginAdmin from './routes/LoginAdminRoute.js'
const server = fastify()
banco.connect()
server.register(cors)

server.register(adminRoutes)
server.register(loginAdmin)

server.listen({ port: 3001}, err => {
  return err
})