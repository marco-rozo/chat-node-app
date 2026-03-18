import { Failure } from "../failure";

export class UnknownFailure extends Failure {
    constructor(message: string = 'Unknown Failure') {
        super('UNKNOWN_FAILURE', message);
    }
}
