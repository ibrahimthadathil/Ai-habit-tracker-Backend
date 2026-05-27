import { AI_controller } from "@/controllers/implementation/Ai/ai-controller";
import { protect } from "@/middleware/auth";
import { Router } from "express";

const aiRoutes = Router()
aiRoutes.use(protect)
aiRoutes.post('/weekly-report',AI_controller.weeklyReportContext.bind(AI_controller))
aiRoutes.post('/suggest-habits',AI_controller.suggestAnyHabit.bind(AI_controller))
aiRoutes.post('/recovery-plan',AI_controller.recoverPlan.bind(AI_controller))
aiRoutes.post('/chat',AI_controller.getChatAnalysis.bind(AI_controller))
aiRoutes.get('/morning',AI_controller.morningMotivations.bind(AI_controller))

export default aiRoutes