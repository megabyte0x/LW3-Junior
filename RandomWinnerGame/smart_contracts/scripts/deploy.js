const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
const { LINK_TOKEN, VRF_COORDINATOR, KEY_HASH, FEE } = require("../constants");

async function main() {

  const randomWinnerGameContract = await ethers.getContractFactory("RandomWinnerGame");
  const randomWinnerGameContractDeploy = await randomWinnerGameContract.deploy(
    VRF_COORDINATOR,
    LINK_TOKEN,
    KEY_HASH,
    FEE
  );

  await randomWinnerGameContractDeploy.deployed();
  console.log("RandomWinnerGame deployed to:", randomWinnerGameContractDeploy.address);

  console.log("Sleeping....");

  await sleep(30000);

  await hre.run("verify:verify", {
    address: randomWinnerGameContractDeploy.address,
    constructorArguments: [VRF_COORDINATOR, LINK_TOKEN, KEY_HASH, FEE]
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main()
  .then(() => processs.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// 0x47DBDd7Dde843e97C3827d4AE6f1d3f7486D3E48