import { auth_controller } from "@/controllers/implementation/auth-contoller";
import { protect } from "@/middleware/auth";
import { Router } from "express";

const authRoute = Router()

authRoute.post('/signup',auth_controller.register.bind(auth_controller))
authRoute.post('/signin',auth_controller.login.bind(auth_controller))
authRoute.get('/current-user',protect,auth_controller.currentUser.bind(auth_controller))

export default authRoute