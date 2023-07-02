import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  role: 'ADMIN' | 'MEMBER' = 'MEMBER',
) {
  await prisma.user.create({
    data: {
      name: 'John doe',
      email: 'john.doe@example.com',
      password_hash: await hash('123456', 14),
      role,
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'john.doe@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
