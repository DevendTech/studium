import fastifyFormbody from '@fastify/formbody'
import bcrypt from 'bcrypt'
import banco from '../bd.js'

export default async function adminRoutes(fastify, options) {
  fastify.register(fastifyFormbody)

  fastify.post('/admin/register', async (request, reply) => {
    const {login, senha} = request.body
    const hashPassword = await bcrypt.hash(senha, 14)
    const granted = await bcrypt.compare('pablo010203',hashPassword)
    const query = await banco.query('INSERT INTO users ("user", password) VALUES ($1, $2) RETURNING *',
      [login,hashPassword])
    return query
  })

}
