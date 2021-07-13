// scripts/deploy.js
async function main() {
  const DuoNFT = await ethers.getContractFactory("DuoNFT");
  console.log("Deploying DuoNFT...");
  const duoNFT = await upgrades.deployProxy(DuoNFT, ["DuoNFT", "DNFT"]);
  console.log("duoNFT proxy deployed to:", duoNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
