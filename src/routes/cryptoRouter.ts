import { Request, Response } from "express";
class CryptoRouter {
  public async getCurrency(req: Request, res: Response) {
    const tableName: string = req.params.id;
    const result = "Hey";
    return res.json(result);
  }
}
export { CryptoRouter };
