import { FastifyInstance } from 'fastify'

import { jwtVerify } from '@/http/middlewares/verify-jwt'

import { create } from './create'
import { nearby } from './nearby'
import { search } from './search'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', jwtVerify)

  app.get('/gyms/search', search)
  app.get('/gyms/neary', nearby)

  app.post('/gyms', create)
}