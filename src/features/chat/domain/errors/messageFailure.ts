import { Failure } from "../../../../core/errors/failure";

export class SendMessageFailure extends Failure {
    constructor(message: string = 'Erro ao enviar mensagem') {
        super('SEND_MESSAGE_ERROR', message);
    }
}

export class SaveMessageFailure extends Failure {
    constructor(message: string = 'Erro ao salvar mensagem') {
        super('SAVE_MESSAGE_ERROR', message);
    }
}

export class FindMessagesFailure extends Failure {
    constructor(message: string = 'Erro ao buscar mensagens') {
        super('FIND_MESSAGES_ERROR', message);
    }
}
