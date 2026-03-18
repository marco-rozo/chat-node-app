import { Failure } from "../../../../core/errors/failure";

export class UserRegisterFailure extends Failure {
    constructor(message: string = 'Erro ao cadastrar usuário') {
        super('USER_REGISTER_ERROR', message);
    }
}

export class UserEmailAlreadyExistsFailure extends Failure {
    constructor(message: string = 'Email já cadastrado') {
        super('USER_EMAIL_ALREADY_EXISTS_ERROR', message);
    }
}

export class UserNotFoundFailure extends Failure {
    constructor(message: string = 'Usuário não encontrado') {
        super('USER_NOT_FOUND_ERROR', message);
    }
}
