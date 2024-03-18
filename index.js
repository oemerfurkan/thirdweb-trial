"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = require("@thirdweb-dev/sdk");
const dotenv_1 = __importDefault(require("dotenv"));
const ethers_1 = require("ethers");
dotenv_1.default.config();
const signer = new ethers_1.ethers.Wallet(process.env.PRIVATE_KEY);
const sdk = sdk_1.ThirdwebSDK.fromSigner(signer, "sepolia", {
    secretKey: process.env.SECRET_KEY,
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const contract = yield sdk.getContract("0xd9AeE92a600F2fB7F2eE352d3d4286491ADCcB77");
        const tx = yield contract.erc1155.claim(
        // "0xa2e5306F55872af862B0fbf44a89484955a6BeDe",
        0, 1);
        console.log(tx.receipt);
        const nftAbi = contract.abi;
        const contractInterface = new ethers_1.ethers.utils.Interface(nftAbi);
        const functionCall1 = contractInterface.encodeFunctionData("claimTo", [ /* values */]);
        const functionCall2 = contractInterface.encodeFunctionData("claimTo", [ /* values */]);
        contract.call("multicall", [functionCall1, functionCall2]);
    });
}
main().catch((err) => console.error(err));
