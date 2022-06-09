require('dotenv').config()
const { ethers } = require("ethers");
const provider = new ethers.providers.JsonRpcProvider(process.env.JSON_RPC);
const addressReceiver = process.env.ADDRESS;
const privateKeys = [process.env.PRIVATE_KEY_1,
  process.env.PRIVATE_KEY_2,
  process.env.PRIVATE_KEY_3,
  process.env.PRIVATE_KEY_3];
    console.log("Made by @rodrigoherrerai Modified by @ayushch80");
const bot = async () => {
  provider.on("block", async () => {
    console.log("Listening new block, waiting...");
    for (let i = 0; i < privateKeys.length; i++) {
      const _target = new ethers.Wallet(privateKeys[i]);
      const target = _target.connect(provider);
      const balance = await provider.getBalance(target.address);
      const txBuffer = ethers.utils.parseEther(process.env.MIN_ETH);
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
