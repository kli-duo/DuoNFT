// test/Box.js
// Load dependencies
const { expect, assert } = require("chai");

let DuoNFT;
let duoNFT;

// Start test block
describe("DuoNFT", function () {
  beforeEach(async function () {
    DuoNFT = await ethers.getContractFactory("DuoNFT");
    duoNFT = await DuoNFT.deploy();
    await duoNFT.deployed();
  });
});
