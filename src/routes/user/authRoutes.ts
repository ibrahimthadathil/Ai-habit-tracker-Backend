import { auth_controller } from "@/controllers/implementation/auth-contoller";
import { Router } from "express";

const authRoute = Router()

authRoute.post('/signup',auth_controller.register.bind(auth_controller))
authRoute.post('/signin',auth_controller.login.bind(auth_controller))

export default authRoute