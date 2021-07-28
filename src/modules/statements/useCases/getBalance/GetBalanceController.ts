import { Request, Response } from "express";
import { container } from "tsyringe";

import { BalanceMap } from "../../mappers/BalanceMap";
import { GetBalanceUseCase } from "./GetBalanceUseCase";

export class GetBalanceController {
  async execute(request: Request, response: Response) {
    const { id: userId } = request.user;

    const getBalance = container.resolve(GetBalanceUseCase);

    const balance = await getBalance.execute({ userId });

    const balanceDTO = BalanceMap.DTO(balance);

    return response.json(balanceDTO);
  }
}
