/*  Express Web Application - REST API Host  */
import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import { Controller } from "./routes/controller";

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
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.express.use("/", this.controller.router);
  }
}
