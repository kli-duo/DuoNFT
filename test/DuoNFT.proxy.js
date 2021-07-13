// test/Box.proxy.js
// Load dependencies
const { expect, assert } = require("chai");

let DuoNFT;
let duoNFT;

// Start test block
describe("DuoNFT (proxy)", function () {
  beforeEach(async function () {
    DuoNFT = await ethers.getContractFactory("DuoNFT");
    duoNFT = await upgrades.deployProxy(DuoNFT, ["DuoNFT", "DNFT"]);
  });

  it("has a name", async () => {
    assert.equal(await duoNFT.name(), "DuoNFT");
  });
});
