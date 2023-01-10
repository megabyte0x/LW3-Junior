const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });


async function main() {

  const metadataURL = "ipfs://QmRSrEfbiiUeF4E2ThzCgSLKcvBi8u4eujJf8UVa7dNU88/";


  const MegabytePunksContract = await ethers.getContractFactory("MegabytePunks");

  const megabytePunksContractDeploy = await MegabytePunksContract.deploy(metadataURL);

  await megabytePunksContractDeploy.deployed();

  console.log("MegabytePunks deployed to:", megabytePunksContractDeploy.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })

// 0x67c86bDE091d6cAd2b0805048c4E63faA7E05CEE