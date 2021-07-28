import { User } from "../entities/User";

export class ProfileMap {
  static DTO({ id, name, email, created_at, updated_at }: User) {
    return {
      id,
      name,
      email,
      created_at,
      updated_at,
    };
  }
}
