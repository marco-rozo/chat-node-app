import { Router } from "express";
import { userController } from "../../features/user";
import { authController } from "../../features/auth";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/login", (request, response) => {
  return authController.login(request, response);
});

router.post("/register", (request, response) => {
  return userController.register(request, response);
});

router.get('/all', authMiddleware, (request, response) => {
  console.log('Servidor Express funcionando!');
  console.log('Teste debug');
  response.send('Servidor Express + Socket.IO funcionando!');
});


router.get('/', (request, response) => {
  console.log('Servidor Express funcionando!');
  console.log('Teste debug');
  response.send('Servidor Express + Socket.IO funcionando!');
});

// router.get("/users", authMiddleware, (request, response) => {
//   return userController.getAll(request, response);
// });

export default router;
