import { SocketEmitterImpl } from '../../core/external/websocket/socketEmitterImpl';
import { FindUserByIdDatasourceImpl } from '../user/data/datasources/impl/findUserByIdDatasourceImpl';
import { CreateChatDatasourceImpl } from './data/datasources/impl/createChatDatasourceImpl';
import { FindChatByRoomDatasourceImpl } from './data/datasources/impl/findChatByRoomDatasourceImpl';
import { FindChatsByUserDatasourceImpl } from './data/datasources/impl/findChatsByUserDatasourceImpl';
import { FindMessagesByChatDatasourceImpl } from './data/datasources/impl/findMessagesByChatDatasourceImpl';
import { SaveMessageDatasourceImpl } from './data/datasources/impl/saveMessageDatasourceImpl';
import { UpdateChatDatasourceImpl } from './data/datasources/impl/updateChatDatasourceImpl';
import { CreateChatUsecaseImpl } from './domain/usecases/impl/createChatUsecaseImpl';
import { FindChatByRoomUsecaseImpl } from './domain/usecases/impl/findChatByRoomUsecaseImpl';
import { GetChatMessagesUsecaseImpl } from './domain/usecases/impl/getChatMessagesUsecaseImpl';
import { GetUserChatsUsecaseImpl } from './domain/usecases/impl/getUserChatsUsecaseImpl';
import { SendMessageUsecaseImpl } from './domain/usecases/impl/sendMessageUsecaseImpl';
import { ChatController } from './presenter/controllers/chatController';

const createChatDatasource = new CreateChatDatasourceImpl();
const updateChatDatasource = new UpdateChatDatasourceImpl();
const findChatByRoomDatasource = new FindChatByRoomDatasourceImpl();
const saveMessageDatasource = new SaveMessageDatasourceImpl();
const findChatsByUserDatasource = new FindChatsByUserDatasourceImpl();
const findUserByIdDatasource = new FindUserByIdDatasourceImpl();
const findMessagesByChatDatasource = new FindMessagesByChatDatasourceImpl();
const findChatByRoomUsecase = new FindChatByRoomUsecaseImpl(findChatByRoomDatasource);
const socketEmitter = new SocketEmitterImpl();

const sendMessageUsecase = new SendMessageUsecaseImpl(
    saveMessageDatasource,
    findUserByIdDatasource,
    socketEmitter,
    updateChatDatasource,
    findChatByRoomUsecase
);

const createChatUsecase = new CreateChatUsecaseImpl(createChatDatasource, findChatByRoomDatasource);

const getUserChatsUsecase = new GetUserChatsUsecaseImpl(
    findChatsByUserDatasource,
    findUserByIdDatasource
);

const getChatMessagesUsecase = new GetChatMessagesUsecaseImpl(
    findMessagesByChatDatasource
);

const chatController = new ChatController(
    createChatUsecase,
    getUserChatsUsecase,
    getChatMessagesUsecase
);

// Exporto apenas as classes que eu vou utilizar em outros locais ()
export { chatController, sendMessageUsecase };
