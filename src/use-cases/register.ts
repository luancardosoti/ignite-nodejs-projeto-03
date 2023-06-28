import { UsersRepository } from '@/repositories/users-repository'
import type { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './erros/user-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(
    data: RegisterUseCaseRequest,
  ): Promise<RegisterUseCaseResponse> {
    const { name, email, password } = data

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const password_hash = await hash(password, 14)

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return {
      user,
    }
  }
}
