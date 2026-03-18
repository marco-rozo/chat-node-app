import { Failure } from "../failure"

export class InvalidParameterFailure extends Failure {
    constructor(message: string = 'Invalid parameter') {
        super('INVALID_PARAMETER', message);
    }
}