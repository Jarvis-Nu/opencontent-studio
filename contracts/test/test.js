const hre = require("hardhat");

async function main() {
    const opencontentFactory = await hre.ethers.getContractFactory("OpenContent")
    const opencontentContract = await opencontentFactory.deploy()
    console.log("Contract deployed to:", opencontentContract.address);
};

main();