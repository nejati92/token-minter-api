import { Router, Request, Response, NextFunction } from "express";
import { MongoConnection } from "../data/mongoConnection";
import { CryptoRouter } from "./cryptoRouter";
class Controller {

    public router: Router;

    constructor(private readonly cryptoRouter: CryptoRouter) {
        this.router = Router();
        this.init();
    }

    public getRouter(): any {
        return this.router;
    }

    public init() {
        this.router.get("/currency/:id", this.cryptoRouter.getCurrency.bind(this.cryptoRouter));
    }
}
export { Controller };
