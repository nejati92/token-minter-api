import axios from "axios";
import { Transaction } from "ethereumjs-tx";
import * as fs from "fs";
const Web3 = require("web3");

const contractHash = "0xA930f24858Df2c8BEF310ADC73Be1f6Ba3d6c990";
const contractPath = "erc721Token.json";
const contractInterface = fs.readFileSync(contractPath, "utf-8");
const web3Provider = `https://ropsten.infura.io/v3/73ee469f1e0540e1871cf2f6fec2cfc8`;
const inter = JSON.parse(contractInterface).abi as any[];
const web3 = new Web3();
web3.setProvider(web3Provider);
web3.eth.defaultAccount = "0x617F9065F2Ac54137d4F85A6BB3E53F4B0498695";
const contract = new web3.eth.Contract(inter, contractHash);
let cachedNonce: number = 0;

export const getContract = () => contract;

export const getGasPrices = async () => {
  const response = await axios.get(
    "https://ethgasstation.info/json/ethgasAPI.json"
  );
  const prices = {
    low: response.data.safeLow,
    medium: response.data.average,
    high: response.data.fast
  };
  return prices;
};

export const sendSignedTransaction = async (transactionData: string) => {
  try {
    const gasPricePromise = getGasPrices();
    const noncePromise = web3.eth.getTransactionCount(web3.eth.defaultAccount);
    const [{ high: gasPriceHigh }, nonce] = await Promise.all([
      gasPricePromise,
      noncePromise
    ]);
    cachedNonce = nonce > cachedNonce ? nonce : cachedNonce + 1;
    const txParams = {
      chainId: 3,
      gasLimit: web3.utils.toHex(1000000),
      gasPrice: web3.utils.toHex(gasPriceHigh),
      nonce: web3.utils.toHex(cachedNonce),
      to: contractHash,
      value: web3.utils.toHex(0),
      data: transactionData,
      from: "0x617F9065F2Ac54137d4F85A6BB3E53F4B0498695"
    };
    const transaction = new Transaction(txParams, { chain: "ropsten" });
    transaction.sign(
      Buffer.from(
        "494AC4A0C5DF457C435A747E1C7F4523E86CF474D1DFA6DE35F989992A1D4312",
        "hex"
      )
    );
    const serializedTransaction = transaction.serialize();
    const hash = web3.utils.sha3(serializedTransaction);
    web3.eth.sendSignedTransaction(
      `0x${serializedTransaction.toString("hex")}`
    );
    return hash;
  } catch (e) {
    console.error(e);
  }
};
