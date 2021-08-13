import { Application, Request, Response } from "express";
import UserRoutes from "./User";
import MessageRoutes from "./Message";
import GatewayRoutes from "./Gateway";
export class IndexRoutes {
  public route(app: Application) {
    app.use("/user", UserRoutes);
    app.use("/message", MessageRoutes);
    app.use("/gateway", GatewayRoutes);

    //   Health Check Path
    app.get("/healthz", (req, res) => {
      res.status(200).send({ message: "Server Healthy!" });
    });

    app.get("/", (req: Request, res: Response) => {
      res.status(200).json({ message: "SAPI API Server" });
    });
  }
}
