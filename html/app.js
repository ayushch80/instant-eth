import { ethers } from "https://cdn.ethers.io/lib/ethers-5.2.esm.min.js";
const provider = new ethers.providers.JsonRpcProvider("JSON_RPC_URL_HERE");
const addressReceiver = "YOUR_RECEIVING_ETHEREUM_ADDRESS";
const privateKeys = ["SENDER'S_PRIVATE_KEY",
  "SENDER'S_PRIVATE_KEY",
  "SENDER'S_PRIVATE_KEY",
  "SENDER'S_PRIVATE_KEY"];
    console.log("Made by @rodrigoherrerai Modified by @ayushch80");
const bot = async () => {
  provider.on("block", async () => {
    console.log("Listening new block, waiting...");
    for (let i = 0; i < privateKeys.length; i++) {
      const _target = new ethers.Wallet(privateKeys[i]);
      const target = _target.connect(provider);
      const balance = await provider.getBalance(target.address);
      const txBuffer = ethers.utils.parseEther("MINIMUM_AMOUNT_OF_ETH");
      if (balance.sub(txBuffer) > 0) {
        console.log(`Found an account with ETH balance --> ${ethers.utils.formatEther(balance)}`);
        const amount = balance.sub(txBuffer);
        try {
          await target.sendTransaction({
            to: addressReceiver,
            value: amount
          });
          const amount_r = amount / 1000000000000000000
          console.log(`Successfully transfered --> ` + amount_r);
        }
        catch (e) {
            console.log(`Oh no! thats an ERROR : ${e}`);
        }
      }
    }
  });
}

bot();
