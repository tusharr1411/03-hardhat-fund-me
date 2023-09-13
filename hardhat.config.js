require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("@nomiclabs/hardhat-solhint")
require("hardhat-deploy")
// require("@nomiclabs/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY

const GANACHE_RPC_URL = process.env.GANACHE_RPC_URL
const GANACHE_PRIVATE_KEY = process.env.GANACHE_PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

module.exports = {
    // solidity: "0.8.7",
    solidity: {
        compilers: [{ version: "0.8.8" }, { version: "0.6.6" }],
    },

    defaultNetwork: "hardhat",

    networks: {
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [GOERLI_PRIVATE_KEY],
            chainId: 5,
            blockConfirmations: 6, // default block confirmation for goerli
        },
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [SEPOLIA_PRIVATE_KEY],
            chainId: 11155111,
            blockConfirmations: 6,
        },
        ganache: {
            url: GANACHE_RPC_URL,
            accounts: [GANACHE_PRIVATE_KEY],
            // chainId: 1337
        },

        localhost: {
            url: "http://127.0.0.1:8545/",
            // accounts:[PRIVATE_KEY], // hardhat will auto set
            // chainId: 31337, // same as hardhat
            // no need to add chain ID in newer versions
        },
    },

    namedAccounts: {
        /*
    _nameOfAccount:{
      default:0, // means the 0th account will be called nameOfAccount
      _chianId: possitionOnthatnetwork, 
    */
        deployer: {
            default: 0,
            // 5: 1,
            // 5: 1,
            // 31337: 2,
        },
        user: {
            default: 1,
            // 5: 2,
            // 31337: 1,
        },
    },

    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt", //this will write gas table in .txt file instead of terminal, also add it to gitignore
        noColors: true, // colors are good in terminal only
        currency: "USD",
        // coinmarketcap: COINMARKETCAP_API,
        token: "MATIC", // to see in polygon blockchain
    },
}

// solhint
// install solhint yarn add solhint
// install .solhint.json file by typing yarn solhint --init
// I then had to update the .solhint.json file as the default
//       rules which were enabled with the --init didn't seem to work, so
//       I replaced the text as per the docs so my .solhint.json file looks like this
//then ran yarn solhint contracts/*.sol in the terminal
/*
{
"extends": "solhint:recommended",
    "plugins": [],
    "rules": {
      "avoid-suicide": "error",
      "avoid-sha3": "warn"
    }
}
*/
