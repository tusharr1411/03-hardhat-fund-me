const networkConfig = {
    11155111: {
        name: "sepolia",
        ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    },
    5: {
        name: "goerli",
        ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
    },
    137: {
        name: "polygon",
        ethUsdPriceFeed: "0x56672nhHGHgygwu278randomaddress",
    },
    31337: {
        name: "localhost",
    },

    //
}

const developmentChains = ["hardhat", "localhost", "ganache"]
const DECIMALS = 8
const INITIAL_ANSWER = 200000000000

//export this network config to be available for other parts of this project
module.exports = {
    networkConfig,
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER,
}
