const { run } = require("hardhat")

// function to verify contract on etherscan

async function verify(contratcAddress, args) {
    console.log("Verifying contract ... ")

    try {
        await run("verify:verify", {
            address: contratcAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified !")
        } else {
            console.log(e)
        }
    }
}

module.exports = { verify }
