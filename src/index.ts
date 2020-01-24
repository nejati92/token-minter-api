import * as http from "http";
import * as debug from "debug";
import { App } from "./app";
import { Controller } from "./routes/controller";
import { CryptoRouter } from "./routes/cryptoRouter";

debug("ts-express:server");

async function open() {
  const cryptoRouter: CryptoRouter = new CryptoRouter();
  const controller: Controller = new Controller(cryptoRouter);

  const app: App = new App(controller);
  const port = normalizePort(process.env.PORT || 8080);
  app.express.set("port", port);
  const server = http.createServer(app.express);
  server.listen(port);
  server.on("error", onError);
  server.on("listening", onListening);

  function normalizePort(val: number | string): any {
    const portNumber: number =
      typeof val === "string" ? parseInt(val, 10) : val;
    if (isNaN(portNumber)) return val;
    else if (portNumber > 0) return portNumber;
    else return false;
  }

  function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== "listen") throw error;
    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    switch (error.code) {
      case "EACCES":
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
      case "EADDRINUSE":
        console.error(`${bind} is already in use`);
        process.exit(1);
      default:
        throw error;
    }
  }

  function onListening(): void {
    const addr = server.address();
    const bind =
      typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
    debug(`Listening on ${bind}`);
  }
}
open();
