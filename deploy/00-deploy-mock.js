const { network } = require("hardhat")
const {
    developmentChains,
    DECIMALS,
    INITIAL_ANSWER,
} = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    if (developmentChains.includes(network.name)) {
        log(
            "**********Ahh.. directly or indirectly local network is selected. Deploying Mocks...  *********",
        )
        await deploy("MockV3Aggregator", {
            constract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_ANSWER],
        })

        log("Mocks Deployed !")
        log("____________________________________________________________")
    }
}

module.exports.tags = ["all", "mocks"] // to run a script with these tags
