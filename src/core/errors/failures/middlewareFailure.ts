import { Failure } from '../failure';

export class TokenNotProvidedFailure extends Failure {
    constructor(message: string = 'Token not provided') {
        super('TOKEN_NOT_PROVIDED', message);
    }
}

export class InvalidTokenFailure extends Failure {
    constructor(message: string = 'Invalid token') {
        super('INVALID_TOKEN', message);
    }
}
