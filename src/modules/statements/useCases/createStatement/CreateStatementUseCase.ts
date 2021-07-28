import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";

import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { ICreateStatementDTO } from "../../dtos/ICreateStatementDTO";
import { OperationType, Statement } from "../../entities/Statement";
import { IStatementsRepository } from "../../repositories/IStatementsRepository";

@injectable()
export class CreateStatementUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("StatementsRepository")
    private statementsRepository: IStatementsRepository
  ) {}

  async execute({
    userId,
    type,
    amount,
    description,
  }: ICreateStatementDTO): Promise<Statement> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError("Usuário não Existe");
    }

    if (type === OperationType.WITHDRAW || type === OperationType.TRANSFER) {
      const { balance } = await this.statementsRepository.getUserBalance({
        userId,
      });

      if (balance < amount) {
        throw new AppError("Valor insulficiente.");
      }
    }

    const statementOperation = await this.statementsRepository.create({
      userId,
      type,
      amount,
      description,
    });

    return statementOperation;
  }
}
