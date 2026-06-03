import { habitLogs_controller } from '@/controllers/implementation/habit/habit-log-controller'
import { protect } from '@/middleware/auth'
import { Router} from 'express'

const logRoutes = Router()
logRoutes.use(protect)
logRoutes.post('/',habitLogs_controller.markCompleted.bind(habitLogs_controller))
logRoutes.delete('/',habitLogs_controller.unMarkLog.bind(habitLogs_controller))
logRoutes.get('/today',habitLogs_controller.getToday.bind(habitLogs_controller))
logRoutes.get('/range',habitLogs_controller.getRange.bind(habitLogs_controller))
logRoutes.get('/heatmap',habitLogs_controller.getheatMap.bind(habitLogs_controller))
logRoutes.get('/stats',habitLogs_controller.getAllStatus.bind(habitLogs_controller))
logRoutes.get('/stats/:habitId',habitLogs_controller.getHabitStatus.bind(habitLogs_controller))

export default logRoutes