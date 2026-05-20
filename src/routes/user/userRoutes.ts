import { user_controller } from "@/controllers/implementation/user-controller";
import { protect } from "@/middleware/auth";
import { Router } from "express";


const userRoutes = Router()

userRoutes.put('/profile',protect,user_controller.profileUpdate.bind(user_controller))
export default userRoutes