import { UserModel } from "../../models/db";

declare global {
    namespace Express {
      interface User extends UserModel {}
    }
  }