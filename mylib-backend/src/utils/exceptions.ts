class InvalidCredentialsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidCredentialsError"
    }
}

class UserNotCreatedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UserNotCreatedError"
    }
}

export {
    InvalidCredentialsError,
    UserNotCreatedError
}