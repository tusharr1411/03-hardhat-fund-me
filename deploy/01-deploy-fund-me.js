const { network } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config") //just importing networkConfig object from the helper-hardhat-config.js
//const helperConfig = require("../helper-hardhat-config") // importing entire thing as heperConfig
//const networkConfig = helperConfig.networkConfig // importing networkConfig module as networkConfig from helperConfig

const { verify } = require("../utils/verify")
require("dotenv").config()
/*
//In ethers we make a main fucntion and then call it manually,here we can do it in three ways

//1
async funciton deployFunc(hre){
    console.log("Bob lazar");
}
module.exports.default = deployFunc

//2
module.exports = async(hre)=>{
    const {getNamedAccounts, deployments} = hre // grabing from hre
}
*/

//import networkconfig from helper-hardhat-config

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments // grabing deploy and log functions from deployents
    const { deployer } = await getNamedAccounts() //see config.js for more detail
    const chainId = network.config.chainId

    //when going for hardhat or loacl we want to use a mock
    // also we will replace the (mock) object dynamically (replace api3 contract for ethusd)

    // const ethUsdPriceFeedAddress  = networkConfig[chainId]["ethUsdPriceFeed"]

    //if chain id x: address a
    //if chain id y: address b
    // for this we are going to use helper-hardhat-config by aave
    // const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]

    let ethUsdPriceFeedAddress

    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress], // arguments to constructor
        log: true, //console.log basic trx data
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log("-----------transaction Completed--------------")

    //if not on localchain then verify
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        log("verifying....")
        await verify(fundMe.address, [ethUsdPriceFeedAddress])
        log("verification completed  ! enjoy")
    }
}

module.exports.tags = ["all", "fundme"]

/*Mocking :
//https://stackoverflow.com/questions/2665812/what-is-mocking
Mocking is primarily used in unit testing. An object under test may have dependencies on other
(complex) objects. To isolate the behaviour of the object you want to test you replace the other 
objects by mocks that simulate the behaviour of the real objects. This is useful if the real 
objects are impractical to incorporate into the unit test.In short, mocking is creating objects 
that simulate the behaviour of real objects*/
