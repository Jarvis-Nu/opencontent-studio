import contractAbi from "./abis/OpenContent.json"
import { ethers } from "ethers"

function connectContract() {
    const contractAddress = "0x8632bF5830274db1A43cDc910aDCA981Db6ef0E8"
    let contract
    try {
        const { ethereum } = window
        const { abi } = contractAbi
        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner()
            contract = new ethers.Contract(contractAddress, abi, signer)
        }
        else {
            console.log("Ethereum object does not exist")
        }
    } catch (error) {
        console.log("Error: ", error)
    }
    return contract
}

export default connectContract