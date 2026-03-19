export abstract class Failure {
    public errorCode: string;
    public message: string;

    constructor(errorCode: string, message: string) {
        this.errorCode = errorCode;
        this.message = message;
    }
}
