import { Failure } from "../failure";

export class HttpResponseFailure extends Failure {
    statusCode: number;
    data: any;

    constructor(
        message: string = 'Http response error',
        statusCode: number,
        data: any
    ) {
        super('HTTP_RESPONSE_ERROR', message);
        this.statusCode = statusCode;
        this.data = data;
    }
}
