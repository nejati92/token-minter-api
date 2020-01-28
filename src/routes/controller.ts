import { Router } from "express";
import { TokenRouter } from "./tokenRouter";
class Controller {
  public router: Router;

  constructor(private readonly tokenRouter: TokenRouter) {
    this.router = Router();
    this.init();
  }

  public getRouter(): any {
    return this.router;
  }

  public init() {
    this.router.post(
      "/token/mint",
      this.tokenRouter.save.bind(this.tokenRouter)
    );
  }
}
export { Controller };
