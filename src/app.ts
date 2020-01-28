/*  Express Web Application - REST API Host  */
import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import { Controller } from "./routes/controller";
import * as cors from "cors";
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
export class App {
  public express: express.Application;

  constructor(private readonly controller: Controller) {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(logger("dev"));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));

    this.express.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, application/json"
      );
      res.header("Cache-Control", "no-cache, no-store, must-revalidate");
      res.header("Pragma", "no-cache");

      next();
    });
  }

  private routes(): void {
    this.express.use("/", this.controller.router);
  }
}
