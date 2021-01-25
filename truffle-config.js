require('dotenv').config();

const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    dev: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
      from: "0x2B522cABE9950D1153c26C1b399B293CaA99FcF9",
      gasPrice: 10e9, // 10 gwei
      gas: 6600000
    },
    ganache: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
      from: "0x2B522cABE9950D1153c26C1b399B293CaA99FcF9",
      //from: "0x0000000000000000000000000000000000000001",
      gasPrice: 10e9, // 10 gwei
      gas: 6600000
    },
    geth: {
      host: "127.0.0.1",
      port: 8110,
      network_id: "1234"
    },
    het: {
      provider: () => new HDWalletProvider([process.env.PK], 'https://http-testnet.hecochain.com', 0, 2),
      network_id: 256,
      gasPrice: 10e9, // 10 gwei
      gas: 6900000
    },
    kovan: {
			provider:  () => new HDWalletProvider([process.env.KOVAN_PK], process.env.KOVAN_HOST, 0, 2), // start at address_index 0 and load both addresses,
			network_id: 42,
      gasPrice: 10e9, // 10 gwei
      gas: 6900000,
      timeoutBlocks: 50000
    },
    rinkeby: {
      provider:  () => new HDWalletProvider([process.env.RINKEBY_PK], process.env.RINKEBY_HOST, 0, 2), // start at address_index 0 and load both addresses,
      network_id: 4,
      gasPrice: 10e9, // 10 gwei
      gas: 6900000,
      timeoutBlocks: 50000,
      skipDryRun: true
    },
    ropsten: {
			provider:  () => new HDWalletProvider([process.env.PK], process.env.HOST, 0, 2), // start at address_index 0 and load both addresses,
			network_id: 3,
      gasPrice: 20e9,
      gas: 6900000,
      timeoutBlocks: 50000,
      skipDryRun: true
    },
    mainnet: {
			provider:  () => new HDWalletProvider([process.env.MPK], process.env.MHOST, 0, 2), // start at address_index 0 and load both addresses,
			network_id: 1,
      gasPrice: 60e9,
      gas: 6900000,
      timeoutBlocks: 50000
    },
  },
  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 50000
  },
  compilers: {
    solc: {
      version: '0.6.12+commit.27d51765', // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    },
  },
  plugins: ["truffle-plugin-verify"],
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY
  }
};
