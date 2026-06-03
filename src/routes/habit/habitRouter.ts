import { habit_controller } from "@/controllers/implementation/habit/habit-controller";
import { protect } from "@/middleware/auth";
import { Router } from "express";


const habitRoutes = Router()

habitRoutes.use(protect)
habitRoutes.get('/',habit_controller.getUserHabit.bind(habit_controller))
habitRoutes.post('/',habit_controller.addNewhabit.bind(habit_controller))
habitRoutes.put('/reorder',habit_controller.reOrderHabits.bind(habit_controller))
habitRoutes.put('/:id',habit_controller.updateHabitNote.bind(habit_controller))
habitRoutes.delete('/:id',habit_controller.deleteHabit.bind(habit_controller))
habitRoutes.put('/:id/archive',habit_controller.updateArchive.bind(habit_controller))

export default habitRoutes