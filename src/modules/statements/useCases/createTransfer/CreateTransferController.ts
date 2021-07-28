import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateTransferUseCase from "./CreateTransferUseCase";

class CreateTransferController {
  async handle(request: Request, response: Response) {
    const { userId } = request.params;
    const { amount, description } = request.body;

    const createTransferUseCase = container.resolve(CreateTransferUseCase);

    await createTransferUseCase.execute({
      amount,
      description,
      userIdSource: userId,
      userIdDestiny: userId,
    });
  }
}

export default CreateTransferController;
