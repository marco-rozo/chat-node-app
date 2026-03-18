import { Failure } from "../../../../core/errors/failure";

export class UserAuthFailure extends Failure {
    constructor(message: string = 'Erro ao autenticar usuário') {
        super('USER_AUTH_ERROR', message);
    }
}

export class UserAuthNotFoundFailure extends Failure {
    constructor(message: string = 'Usuário não encontrado') {
        super('USER_AUTH_NOT_FOUND_ERROR', message);
    }
}

export class UserAuthInvalidPasswordFailure extends Failure {
    constructor(message: string = 'Senha inválida') {
        super('USER_AUTH_INVALID_PASSWORD_ERROR', message);
    }
}
