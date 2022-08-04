const { ethers } = require("hardhat");

async function main() {
  const contractFactory = await ethers.getContractFactory("List");
  const deployedContract = await contractFactory.deploy();
  await deployedContract.deployed();

  console.log("Contract deployed at: ", deployedContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });