import express, { Express } from "express";
import { Server } from "http";
import { ILoggerService } from "./logger/logger.service";
import { UserController } from "./users/users.controller";
import { ExeptionFilter } from "./errors/exeption.filter";

export default class App {
  app: Express;
  server: Server;
  port: number;
  logger: ILoggerService;
  userController: UserController;
  exeptionFilter: ExeptionFilter;

  constructor(
    logger: ILoggerService,
    userController: UserController,
    exeptionFilter: ExeptionFilter
  ) {
    this.app = express();
    this.port = 1488;
    this.logger = logger;
    this.userController = userController;
    this.exeptionFilter = exeptionFilter;
  }

  // Сначала вызываем middleware, потом роутеры -> exeption фильтры
  useRoutes() {
    this.app.use("/users", this.userController.router);
  }

  useExeptionFilters() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  public async init() {
    this.useRoutes();
    this.useExeptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`Server is up and running! http://localhost:${this.port}`);
  }
}
