import { Failure } from "../../../../core/errors/failure";

export class CreateChatFailure extends Failure {
    constructor(message: string = 'Erro ao criar chat') {
        super('CREATE_CHAT_ERROR', message);
    }
}

export class UpdateChatFailure extends Failure {
    constructor(message: string = 'Erro ao atualizar chat') {
        super('UPDATE_CHAT_ERROR', message);
    }
}


export class ChatNotFoundFailure extends Failure {
    constructor(message: string = 'Chat não encontrado') {
        super('CHAT_NOT_FOUND_ERROR', message);
    }
}