import { Statement } from "../entities/Statement";

export class BalanceMap {
  public static DTO({
    statement,
    balance,
  }: {
    statement: Statement[];
    balance: number;
  }) {
    const pStatement = statement.map(
      ({ id, amount, description, type, created_at, updated_at }) => ({
        id,
        amount: Number(amount),
        description,
        type,
        created_at,
        updated_at,
      })
    );

    return {
      statement: pStatement,
      balance: Number(balance),
    };
  }
}
