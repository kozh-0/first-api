import { Router, NextFunction, Request, Response } from "express";
import LoggerService from "../logger/logger.service";

interface IControllerRoute {
  path: string;
  func: (req: Request, res: Response, next: NextFunction) => void;
  method: keyof Pick<Router, "get" | "post" | "put" | "delete" | "patch">;
}

export abstract class BaseController {
  // _ чтобы обозначить, что переменная изменяется только геттерами и сеттерами
  private readonly _router: Router;
  constructor(private logger: LoggerService) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public send<T>(res: Response, code: number, message: T) {
    res.type("application/json");
    res.status(code).json(message);
  }

  protected bindRoutes(routes: IControllerRoute[]) {
    for (const route of routes) {
      this.logger.log(`[${route.method}] ${route.path}`);
      // фиксируем контекст this данного класса и прокидываем в функцию ниже
      const handler = route.func.bind(this);
      // Иначе на уровне ниже, this равнялся бы контексту express
      this.router[route.method](route.path, handler);
      // типа router.get('/login', () => {...})
    }
  }
}
