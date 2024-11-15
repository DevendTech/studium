import fastifyFormbody from '@fastify/formbody'
import fastify from 'fastify'
import bcrypt from 'bcrypt'
import banco from '../bd.js'
import dotenv from 'dotenv'
import cors from '@fastify/cors'

dotenv.config()

export default async function loginAdmin(fastify, options) {
  fastify.register(fastifyFormbody)

  fastify.post('/admin/login', async (request, reply) => {
    const { login, password } = request.body
    const select = await banco.query('SELECT * FROM users WHERE "user" = $1', [login])

    if (select.rowCount === 0) {
      // Retorna erro se o usuário não for encontrado
      return reply.code(401).send({ error: 'Usuário não encontrado' })
    }

    const hashPassword = select.rows[0].password
    const permission = await bcrypt.compare(password, hashPassword)

    if (permission) {
      // Redireciona em caso de sucesso
      const urlDominio = process.env.URLDOMINIO
      return reply.redirect(`http://127.0.0.1:3001/frontend/pages/areaProp.html`)
    } else {
      // Retorna erro se a senha estiver incorreta
      return reply.code(401).send({ error: 'Senha incorreta' })
    }
  })
}
