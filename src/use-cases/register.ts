import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export async function registerUseCase(data: RegisterUseCaseRequest) {
  const { name, email, password } = data

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('E-mail already exists')
  }

  const password_hash = await hash(password, 14)

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })
}
