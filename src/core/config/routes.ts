import { Router } from "express";
import { userController } from "../../features/user";
import { authController } from "../../features/auth";
import authMiddleware from "../middlewares/authMiddleware";
import { chatController } from "../../features/chat";

const router = Router();

router.post("/login", (request, response) => {
  return authController.login(request, response);
});

router.post("/register", (request, response) => {
  return userController.register(request, response);
});

router.post('/find-user', authMiddleware, (request, response) => {
  return userController.findUserByEmail(request, response);
});


router.get('/', (request, response) => {
  console.log('Servidor Express funcionando!');
  console.log('Teste debug');
  response.send('Servidor Express + Socket.IO funcionando!');
});

router.post("/test-chat", (request) => {
  return chatController.receiveNewMessage(request.body);
});

router.post("/create-chat", authMiddleware, (request, response) => {
  return chatController.createChat(request, response);
});

// router.get("/users", authMiddleware, (request, response) => {
//   return userController.getAll(request, response);
// });

export default router;
