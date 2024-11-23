import { z } from "zod"

import { AuthOrigins } from "../models/enums"

const UserModelSchema = z.object({
    user_id: z.number().optional(),
    auth_origin: z.nativeEnum(AuthOrigins),
    auth_id: z.string().optional(),
    oauth_token: z.string().optional(),
    display_name: z.string().optional(),
    email: z.string().email(),
    password: z.string().optional()
});

type UserModel = z.infer<typeof UserModelSchema>;

// Error code 23505 means unique key constraint violation in postgres speak
const PGUnqiueConstraintError = "23505"

export {
    UserModelSchema,
    UserModel,
    PGUnqiueConstraintError
}