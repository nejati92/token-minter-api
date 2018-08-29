import { Request, Response, NextFunction } from "express";
import { MongoConnection } from "../data/mongoConnection";
class CryptoRouter {

    constructor(private readonly mongoConnection: MongoConnection) {
    }

    public async getCurrency(req: Request, res: Response) {
        const tableName: string = req.params.id;
        const result = await this.mongoConnection.getLatest(tableName);
        return res.json(result);
    }
}
export { CryptoRouter };
