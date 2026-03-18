export abstract class Failure {
    errorCode: string;
    message: string;

    constructor(errorCode: string, message: string) {
        this.errorCode = errorCode;
        this.message = message;
    }
}
