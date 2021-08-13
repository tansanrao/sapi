import { Request, Response } from "express";
import UserService from "../services/User";
import { toInteger } from "../utils/_helpers";

export default class UserController {
  public static async getAll(req: Request, res: Response) {
    const result = await UserService.getAll();
    if (result && result.resCode > 0) res.status(200).send(result);
    else if (result) res.status(404).send({ resCode: result.resCode });
    else res.status(500).send();
  }

  public static async getOne(req: Request, res: Response) {
    const result = await UserService.getOne(toInteger(req.params.id));
    if (result && result.resCode > 0) res.status(200).send(result);
    else if (result) res.status(404).send({ resCode: result.resCode });
    else res.status(500).send();
  }

  public static async create(req: Request, res: Response) {
    const result = await UserService.create(req.body);
    if (result && result.resCode > 0) res.status(200).send(result);
    else if (result) res.status(400).send({ resCode: result.resCode });
    else res.status(500).send();
  }

  public static async update(req: Request, res: Response) {
    const result = await UserService.update(toInteger(req.params.id), req.body);
    if (result && result.resCode > 0) res.status(200).send(result);
    else if (result) res.status(400).send({ resCode: result.resCode });
    else res.status(500).send();
  }

  public static async delete(req: Request, res: Response) {
    const result = await UserService.delete(toInteger(req.params.id));
    if (result && result.resCode > 0) res.status(200).send(result);
    else if (result) res.status(400).send({ resCode: result.resCode });
    else res.status(500).send();
  }
}
