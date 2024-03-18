import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import dotenv from "dotenv";
import { ethers } from "ethers";

dotenv.config();

const signer = new ethers.Wallet(process.env.PRIVATE_KEY!);

const sdk = ThirdwebSDK.fromSigner(signer, "sepolia", {
  secretKey: process.env.SECRET_KEY,
});

async function main() {
  const contract = await sdk.getContract(
    "0xd9AeE92a600F2fB7F2eE352d3d4286491ADCcB77"
  );

  const tx = await contract.erc1155.claim(
    // "0xa2e5306F55872af862B0fbf44a89484955a6BeDe",
    0,
    1
  );

  console.log(tx.receipt)

  const nftAbi = contract.abi

  const contractInterface = new ethers.utils.Interface(nftAbi)

  const functionCall1 = contractInterface.encodeFunctionData("claim", [/* values */])
  const functionCall2 = contractInterface.encodeFunctionData("claim", [/* values */])

  contract.call("multicall", [functionCall1, functionCall2])
}

main().catch((err) => console.error(err));
