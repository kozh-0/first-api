import { Response, Request, NextFunction } from "express";
import LoggerService from "../logger/logger.service";
import { HTTPError } from "./http-error.class";

interface IExeptionFilter {
  catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}

export class ExeptionFilter implements IExeptionFilter {
  logger: LoggerService;
  constructor(logger: LoggerService) {
    this.logger = logger;
  }
  catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
    if (err instanceof HTTPError) {
      this.logger.error(`[${err.context}] Ошибка ${err.statusCode} : ${err.message}`);
      res.status(err.statusCode).send({ err: err.message });
    } else {
      this.logger.error(err.message);
      res.status(500).send({ err: err.message });
    }
  }
}
