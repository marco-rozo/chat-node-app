import { Failure } from "../failure";

export class UnauthorizedFailure extends Failure {
    constructor(message: string = 'Unauthorized') {
        super('UNAUTHORIZED_FAILURE', message);
    }
}
