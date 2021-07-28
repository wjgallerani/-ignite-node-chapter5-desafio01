import { container, inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { OperationType } from "../../entities/Statement";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";

interface IRequest {
  userIdSource: string;
  userIdDestiny: string;
  amount: number;
  description: string;
}

@injectable()
class CreateTransferUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({
    userIdSource,
    userIdDestiny,
    amount,
    description,
  }: IRequest): Promise<void> {
    if (amount <= 0) {
      throw new AppError("Favor informe um valor.");
    }

    const userSource = await this.usersRepository.findById(userIdSource);

    if (!userSource) {
      throw new AppError("Usuário de Origem não encontrado.");
    }

    const userDestiny = await this.usersRepository.findById(userIdDestiny);

    if (!userDestiny) {
      throw new AppError("Usuário de Destino não encontrado.");
    }

    const createStatementUseCase = container.resolve(CreateStatementUseCase);

    await createStatementUseCase.execute({
      amount: (amount * -1),
      description,
      type: OperationType.TRANSFER,
      userId: userDestiny.id as string,
    });

    await createStatementUseCase.execute({
      amount,
      description,
      type: OperationType.TRANSFER,
      userId: userSource.id as string,
    });
  }
}

export default CreateTransferUseCase;
