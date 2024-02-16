import { BaseController } from "../common/base.controller";
import LoggerService from "../logger/logger.service";

export class UserController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger);
    this.bindRoutes([
      { path: "/register", method: "post", func: this.register },
      { path: "/login", method: "post", func: this.login },
    ]);
  }

  login() {
    this.router.post("/login", (req, res) => {
      console.log(123);

      res.json({ kek: "login msg!" });
    });
  }

  register() {
    this.router.post("/register", (req, res) => {
      res.send("registraton");
    });
  }
}
