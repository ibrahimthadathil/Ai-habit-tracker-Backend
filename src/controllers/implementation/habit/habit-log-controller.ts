import { STATUS } from "@/const/httpStatus";
import { AuthRequest } from "@/interfaces/user.interface";
import { HabitLog } from "@/services/implementation/habit/habit-log-service";
import { Response } from "express";
import Container, { Service } from "typedi";

@Service()
export class HabitlogController {
  constructor(private habitLogService: HabitLog) {}

  async markCompleted(req: AuthRequest, res: Response) {
    try {
      const { habitId, date } = req.body;
      const { success, log, message } =
        await this.habitLogService.checkComplete(
          { habitId, date },
          req.user!._id.toString(),
        );
      if (success) res.status(STATUS.CREATED.code).json({ success, log });
      else res.status(STATUS.NOT_FOUND.code).json({ message, success });
    } catch (error) {
      res
        .status(STATUS.SERVER_ERROR.code)
        .json({ message: STATUS.SERVER_ERROR.message });
    }
  }

  async unMarkLog(req: AuthRequest, res: Response) {
    try {
      const { habitId, date } = req.body;
      const { message, success } = await this.habitLogService.unCheckLog(
        { habitId, date },
        req.user!._id.toString(),
      );
      if (success) res.status(STATUS.CREATED.code).json({ success, message });
      else res.status(STATUS.BAD_REQUEST.code).json({ message, success });
    } catch (error) {
      res
        .status(STATUS.SERVER_ERROR.code)
        .json({ message: STATUS.SERVER_ERROR.message });
    }
  }
  async getToday(req: AuthRequest, res: Response) {
    try {
      const { success, logs, message } =
        await this.habitLogService.getTodayDate(req.user!._id.toString());
      if (success) res.status(STATUS.SUCCESS.code).json( { success, logs })
      else res.status(STATUS.BAD_REQUEST.code).json( { success, message })
    } catch (err) {
      res
        .status(STATUS.SERVER_ERROR.code)
        .json({ message: STATUS.SERVER_ERROR.message });
    }
  }
  async getRange(req: AuthRequest, res: Response) {
    try {
      const start = req.query.start as string;
      const end = req.query.end as string;
      const { success, logs, message } =
        await this.habitLogService.getDaysrange(
          { start, end },
          req.user!._id.toString(),
        );
      if (success) return { success, logs };
      else return { success, message };
    } catch (error) {
      res
        .status(STATUS.SERVER_ERROR.code)
        .json({ message: STATUS.SERVER_ERROR.message });
    }
  }
  async getheatMap(req: AuthRequest, res: Response) {
    try {
      const logs = await this.habitLogService.getHeatMap(
        req.user!._id.toString(),
      );
      res.status(STATUS.SUCCESS.code).json({ success: true, logs });
    } catch (error) {
      res
        .status(STATUS.SERVER_ERROR.code)
        .json({ message: STATUS.SERVER_ERROR.message });
    }
  }
  async getHabitStatus(req: AuthRequest, res: Response) {
    try {
      const { success, message, data } =
        await this.habitLogService.getHabitStat(
          req.user!._id.toString(),
          req.params.id as string,
        );
      if (success) res.status(STATUS.SUCCESS.code).json({ success, data });
      else res.status(STATUS.BAD_REQUEST.code).json({ success, message });
    } catch (error) {
      res
        .status(STATUS.SERVER_ERROR.code)
        .json({ message: STATUS.SERVER_ERROR.message });
    }
  }
  async getAllStatus(req: AuthRequest, res: Response) {
    try {
      const { data, success } = await this.habitLogService.getAllStat(
        req.user!._id.toString(),
      );
      if (success) res.status(STATUS.SUCCESS.code).json({ success, data });
      else
        res
          .status(STATUS.NOT_FOUND.code)
          .json({ success, message: STATUS.NOT_FOUND.message });
    } catch (error) {
      res
        .status(STATUS.SERVER_ERROR.code)
        .json({ message: STATUS.SERVER_ERROR.message });
    }
  }
}


export const habitLogs_controller = Container.get(HabitlogController)