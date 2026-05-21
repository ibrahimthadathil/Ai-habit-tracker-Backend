import { STATUS } from "@/const/httpStatus";
import { AuthRequest } from "@/interfaces/user.interface";
import { HabitServce } from "@/services/implementation/habit/habit-service";
import { Response } from "express";
import Container, { Service } from "typedi";

@Service()
export class HabitController {
  constructor(private habitService: HabitServce) {}

  async getUserHabit(req: AuthRequest, res: Response) {
    try {
      const { includeArchived } = req.query;
      const { success, habits } = await this.habitService.gethabits(
        req.user?._id.toString(),
        includeArchived as string,
      );
      if (success) res.status(STATUS.SUCCESS.code).json({ success, habits });
      else
        res
          .status(STATUS.BAD_REQUEST.code)
          .json({ success, message: STATUS.BAD_REQUEST.message });
    } catch (error) {
      res
        .status(STATUS.SERVER_ERROR.code)
        .json({ message: STATUS.SERVER_ERROR.message });
    }
  }

  async addNewhabit(req: AuthRequest, res: Response) {
    try {
      const { success, habit, message } = await this.habitService.createHabit(
        req.body,
        req.user._id.toString(),
      );
      if (success) res.status(STATUS.CREATED.code).json({ success, habit });
      else res.status(STATUS.BAD_REQUEST.code).json({ message });
    } catch (error) {
      res
        .status(STATUS.SERVER_ERROR.code)
        .json({ message: STATUS.SERVER_ERROR.message });
    }
  }

  async updateHabitNote(req: AuthRequest, res: Response) {
    try {
      const habitId = req.params.id as string;
      const {success,message,updatedHabit} = await this.habitService.updateHabit(
        habitId,
        req.user._id.toString(),
        req.body,
      );
      if(success) res.status(STATUS.SUCCESS.code).json({updatedHabit,success})
        else res.status(STATUS.BAD_REQUEST.code).json({success,message})
    } catch (error) {
      res
        .status(STATUS.SERVER_ERROR.code)
        .json({ message: STATUS.SERVER_ERROR.message });
    }
  }

  async deleteHabit(req:AuthRequest,res:Response){
    try {
        const habitId = req.params.is as string
        const {message,success} = await this.habitService.deleteHabit(req.user?._id.toString(),habitId)
        if(success)  res.status(STATUS.SUCCESS.code).json({success,message})
            else  res.status(STATUS.NOT_FOUND.code).json({success,message})
    } catch (error) {
         res
        .status(STATUS.SERVER_ERROR.code)
        .json({ message: STATUS.SERVER_ERROR.message });
    }
  }
  async updateArchive(req:AuthRequest,res:Response){
    try{
        const habitId = req.params.id as string
        const {success,message,updatedHabit} = await this.habitService.archiveHabit(req.user._id.toString(),habitId)
        if(success) res.status(STATUS.SUCCESS.code).json({success,updatedHabit})
        else res.status(STATUS.BAD_REQUEST.code).json({success,message})    
    } catch(error){
         res
        .status(STATUS.SERVER_ERROR.code)
        .json({ message: STATUS.SERVER_ERROR.message });
    }
  }
}

export const habit_controller = Container.get(HabitController);
