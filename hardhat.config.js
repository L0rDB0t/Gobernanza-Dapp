require("@nomicfoundation/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_SEPOLIA_URL, // Nombre EXACTO del .env
      accounts: [process.env.PRIVATE_KEY]   // Debe ser un array
    }
  }
};