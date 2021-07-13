// hardhat.config.js
require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config();
require("hardhat-contract-sizer");

const { alchemyApiKey, privateKey, mnemonic } = require("./secrets.json");

// const alchemyApiKey = process.env.ALCHEMY_API_KEY
// const privateKey = process.env.PRIVATE_KEY
// const mnemonic = process.env.MNEMONIC
// console.log(alchemyApiKey)
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${alchemyApiKey}`,
      accounts: { mnemonic: mnemonic },
    },
    // ropsten: {
    //   url: `https://eth-rinkeby.alchemyapi.io/v2/${alchemyApiKey}`,
    //   accounts: [`0x${privateKey}`]
    // }
  },
  paths: {
    artifacts: "./src/artifacts",
  },
};
