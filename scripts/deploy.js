const { ethers } = require("hardhat");

async function main() {
  // 1. Desplegar GovToken (nombre EXACTO del contrato en MyToken.sol)
  const Token = await ethers.getContractFactory("GovToken");
  const token = await Token.deploy();
  await token.waitForDeployment();

  // 2. Desplegar MyGovernor (nombre del contrato en GovernanceToken.sol)
  const Governor = await ethers.getContractFactory("MyGovernor");
  const governor = await Governor.deploy(token.target);

  console.log("Token address:", token.target);
  console.log("Governor address:", governor.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});