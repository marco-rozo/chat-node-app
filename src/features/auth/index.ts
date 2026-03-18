import { AuthController } from "./presenter/controllers/authController";
import { AuthUserUsecase } from "./domain/usecases/authUserUsecase";
import { findUserByEmailUsecase } from "../user";

const authUserUsecase = new AuthUserUsecase(findUserByEmailUsecase);

const authController = new AuthController(authUserUsecase);

export { authController };
