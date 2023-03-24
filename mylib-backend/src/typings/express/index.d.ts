import { UserModel } from "../db/dbtypes.js";

declare global {
    namespace Express {
      interface User extends UserModel {}
    }
  }