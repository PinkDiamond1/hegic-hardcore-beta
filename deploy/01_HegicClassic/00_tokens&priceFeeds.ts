import { HardhatRuntimeEnvironment } from "hardhat/types"

import PriceProvider from "../../artifacts/@chainlink/contracts/src/v0.7/interfaces/AggregatorV3Interface.sol/AggregatorV3Interface.json"

async function deployment(hre: HardhatRuntimeEnvironment): Promise<void> {
  const { deployments, getNamedAccounts, network } = hre
  const { deploy, save, getArtifact } = deployments
  const { deployer } = await getNamedAccounts()

  if (network.name == "mainnet") {
    const IERC20ABI = await getArtifact("ERC20").then((x) => x.abi)
    const PriceProviderABI = PriceProvider.abi
    await save("HEGIC", {
      address: "0x584bC13c7D411c00c01A62e8019472dE68768430",
      abi: IERC20ABI,
    })
    await save("USDC", {
      address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      abi: IERC20ABI,
    })
    await save("WBTC", {
      address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
      abi: IERC20ABI,
    })
    await save("WETH", {
      address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      abi: IERC20ABI,
    })
    await save("DAI", {
      address: "0x6b175474e89094c44da98b954eedeac495271d0f",
      abi: IERC20ABI,
    })
    await save("WBTCPriceProvider", {
      address: "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c",
      abi: PriceProviderABI,
    })
    await save("ETHPriceProvider", {
      address: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
      abi: PriceProviderABI,
    })
    await save("BTC_ETHPriceProvider", {
      address: "0xdeb288f737066589598e9214e782fa5a8ed689e8",
      abi: PriceProviderABI,
    })
  } else {
    await deploy("HEGIC", {
      contract: "ERC20Mock",
      from: deployer,
      log: true,
      args: ["HEGIC", "H", 18],
    })

    await deploy("USDC", {
      contract: "ERC20Mock",
      from: deployer,
      log: true,
      args: ["USDC (Mock)", "USDC", 6],
    })

    await deploy("WETH", {
      contract: "WETHMock",
      from: deployer,
      log: true,
    })

    await deploy("DAI", {
      contract: "ERC20Mock",
      from: deployer,
      log: true,
      args: ["DAI (Mock)", "DAI", 18],
    })

    await deploy("WBTC", {
      contract: "ERC20Mock",
      from: deployer,
      log: true,
      args: ["WBTC (Mock)", "WBTC", 8],
    })

    await deploy("WBTCPriceProvider", {
      contract: "PriceProviderMock",
      from: deployer,
      log: true,
      args: [50000e8, 8],
    })

    await deploy("ETHPriceProvider", {
      contract: "PriceProviderMock",
      from: deployer,
      log: true,
      args: [2500e8, 8],
    })

    await deploy("BTC_ETHPriceProvider", {
      contract: "PriceProviderMock",
      from: deployer,
      log: true,
      args: ["11948858883976580000", 18],
    })
  }
}

deployment.tags = ["test", "tokens"]
export default deployment
