import { ICreateStatementDTO } from "../dtos/ICreateStatementDTO";
import { IGetBalanceDTO } from "../dtos/IGetBalanceDTO";
import { Statement } from "../entities/Statement";
import { IGetStatementOperationDTO } from "../dtos/IGetStatementOperationDTO";

export interface IStatementsRepository {
  create(data: ICreateStatementDTO): Promise<Statement>;
  findStatementOperation(data: IGetStatementOperationDTO): Promise<Statement | undefined>;
  getUserBalance(data: IGetBalanceDTO): Promise<{ balance: number } | { balance: number; statement: Statement[] }
  >;
}
