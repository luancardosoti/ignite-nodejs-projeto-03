import { UsersRepository } from '@/repositories/prisma/users-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: RegisterUseCaseRequest) {
    const { name, email, password } = data

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new Error('E-mail already exists')
    }

    const password_hash = await hash(password, 14)

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
