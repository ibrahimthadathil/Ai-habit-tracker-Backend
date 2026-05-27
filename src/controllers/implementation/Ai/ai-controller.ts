import { STATUS } from "@/const/httpStatus";
import { AuthRequest } from "@/interfaces/user.interface";
import { AiService } from "@/services/implementation/ai/ai-service";
import { Response } from "express";
import Container, { Service } from "typedi";

@Service()
export class AIController {
  constructor(private aiService: AiService) {}

  async weeklyReportContext(req: AuthRequest, res: Response) {
    try {
      const { content } = await this.aiService.weeklyReport(
        req.user!._id.toString(),
      );
      res.status(STATUS.SUCCESS.code).json({ content });
    } catch (error) {
      res
        .status(STATUS.SERVER_ERROR.code)
        .json({ message: STATUS.SERVER_ERROR.message });
    }
  }
  async suggestAnyHabit(req: AuthRequest, res: Response) {
    try {
      const { success, suggestions } = await this.aiService.suggestHabit(
        req.body,
        req.user!._id.toString(),
      );
      if (success)
        res.status(STATUS.SUCCESS.code).json({ success, suggestions });
      else res.status(STATUS.BAD_REQUEST.code);
    } catch (error) {
      res
        .status(STATUS.SERVER_ERROR.code)
        .json({ message: STATUS.SERVER_ERROR.message });
    }
  }
  async recoverPlan(req: AuthRequest, res: Response) {
    try {
      const { success, content, message } = await this.aiService.recoveryplan(
        req.body,
        req.user!._id.toString(),
      );
      if (success) res.status(STATUS.SUCCESS.code).json({ success, content });
      else res.status(STATUS.NOT_FOUND.code).json({ success, message });
    } catch (error) {
      res
        .status(STATUS.SERVER_ERROR.code)
        .json({ message: STATUS.SERVER_ERROR.message });
    }
  }
  async getChatAnalysis(req: AuthRequest, res: Response) {
    try {
      const { success, content, message } = await this.aiService.chatAnalysis(
        req.body,
        req.user!._id.toString(),
      );
      if (success) res.status(STATUS.SUCCESS.code).json({ success, content });
      else throw new Error(message);
    } catch (error) {
      res
        .status(STATUS.SERVER_ERROR.code)
        .json({ message: STATUS.SERVER_ERROR.message });
    }
  }

  async morningMotivations(req: AuthRequest, res: Response) {
    try {
      const { content } = await this.aiService.morningMotivation(
        req.user!._id.toString(),
      );
      res.json({ content });
    } catch (error) {
      res
        .status(STATUS.SERVER_ERROR.code)
        .json({ message: (error as Error).message });
    }
  }
}

export const AI_controller = Container.get(AIController)
