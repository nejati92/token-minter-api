import { Request, Response } from "express";
import {
  getContract,
  sendSignedTransaction,
  validateEthereumAddress
} from "../web3Client";

let counter = 0;
const cachedIds = [];
export class TokenRouter {
  public async save(req: Request, res: Response) {
    try {
      counter++;
      const avatar = `http://api.adorable.io/avatars/285/${counter}.png`;
      const { id, owner } = req.body;
      if (validateEthereumAddress(owner)) {
        throw new Error("Invalid  address");
      }
      if (cachedIds.includes(parseInt(id))) {
        throw new Error("Id already exist on the blockchain");
      }
      cachedIds.push(parseInt(id));
      const data = getContract()
        .methods.mintUniqueTokenTo(owner, id, avatar)
        .encodeABI();
      const hash = await sendSignedTransaction(data);
      const result = {
        id,
        owner,
        link: `https://ropsten.etherscan.io/tx/${hash}`,
        hash,
        avatar
      };
      return res.json([result]);
    } catch (e) {
      console.error(e);
      res.status(500).send({ error: e.message });
    }
  }
}
