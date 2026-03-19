import { Router } from 'express';
import { authController } from '../../features/auth';
import { chatController } from '../../features/chat';
import { userController } from '../../features/user';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/login', (request, response) => {
  return authController.login(request, response);
});

router.post('/register', (request, response) => {
  return userController.register(request, response);
});

router.get('/find-user/:email', authMiddleware, (request, response) => {
  return userController.findUserByEmail(request, response);
});

router.get('/check-user-online/:userId', authMiddleware, (request, response) => {
  return userController.checkUserOnline(request, response);
});

router.get('/', (_, response) => {
  response.send('Servidor Express + Socket.IO funcionando!');
});

router.post('/create-chat', authMiddleware, (request, response) => {
  return chatController.createChat(request, response);
});

router.get('/user-chats/:userId', authMiddleware, (request, response) => {
  return chatController.getUserChats(request, response);
});

router.get('/get-messages/:chatId', authMiddleware, (request, response) => {
  return chatController.getChatMessages(request, response);
});

export default router;
