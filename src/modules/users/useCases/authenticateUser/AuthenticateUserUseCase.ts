import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import authConfig from "../../../../config/auth";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IAuthenticateUserResponseDTO } from "../../dtos/IAuthenticateUserResponseDTO";
import { AppError } from "../../../../shared/errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    email,
    password,
  }: IRequest): Promise<IAuthenticateUserResponseDTO> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email ou senha incorreto.");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email ou senha incorreto.");
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ user }, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}
