import { DefaultResponse } from "../entities/defaultResponse";
import { Failure } from "../errors/failure";

export function formatErrorResponse(failure?: Failure): DefaultResponse {
    if (failure) {
        return {
            data: failure,
        };
    }
    return {
        data: 'Internal server error',
    };
}

export function formatSuccessResponse(data: any = undefined): DefaultResponse {
    return {
        data: data,
    };
}