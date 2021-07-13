// scripts/prepare_upgrade.js

require("dotenv").config();
const { proxyAddress } = require("../../secrets.json");
async function main() {
  const DuoNFT = await ethers.getContractFactory("DuoNFT");
  console.log("Preparing upgrade...");
  const duoNFT = await upgrades.prepareUpgrade(proxyAddress, DuoNFT);
  console.log("DuoNFT at:", duoNFT);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
