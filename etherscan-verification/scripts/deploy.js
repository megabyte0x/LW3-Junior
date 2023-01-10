const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {

  const verifyContract = await ethers.getContractFactory("Verify");

  const deployedVerifyContract = await verifyContract.deploy();

  await deployedVerifyContract.deployed();

  console.log("Verify Contract Address:", deployedVerifyContract.address);

  console.log("Sleeping.....");
  await sleep(40000);

  await hre.run("verify:verify", {
    address: deployedVerifyContract.address,
    constructorArguments: [],
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// 0x158fe303274322204E5233c971CB676d768Db782