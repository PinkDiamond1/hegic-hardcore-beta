import {HardhatRuntimeEnvironment} from "hardhat/types"

const ETHIVRate = 610000000000
const BTCIVRate = "3100000000000000000000"

async function deployment(hre: HardhatRuntimeEnvironment): Promise<void> {
  const {deployments, getNamedAccounts} = hre
  const {deploy, get, execute} = deployments
  const {deployer} = await getNamedAccounts()

  const BTCPriceProvider = await get("WBTCPriceProvider")
  const ETHPriceProvider = await get("ETHPriceProvider")
  const HegicAtmCall_WETH = await get("HegicWETHCALL")
  const HegicAtmPut_WETH = await get("HegicWETHPUT")
  const HegicAtmCall_WBTC = await get("HegicWBTCCALL")
  const HegicAtmPut_WBTC = await get("HegicWBTCPUT")

  const WETHCALLPricer = await deploy("ETHCallPriceCalculator", {
    contract: "AdaptivePriceCalculator",
    from: deployer,
    log: true,
    args: [ETHIVRate, ETHPriceProvider.address, HegicAtmCall_WETH.address],
  })

  const WETHPUTPricer = await deploy("ETHPutPriceCalculator", {
    contract: "AdaptivePutPriceCalculator",
    from: deployer,
    log: true,
    args: [2500, ETHPriceProvider.address, HegicAtmPut_WETH.address, 18],
  })

  const WBTCCALLPricer = await deploy("BTCCallPriceCalculator", {
    contract: "AdaptivePriceCalculator",
    from: deployer,
    log: true,
    args: [BTCIVRate, BTCPriceProvider.address, HegicAtmCall_WBTC.address],
  })

  const WBTCPUTPricer = await deploy("BTCPutPriceCalculator", {
    contract: "AdaptivePutPriceCalculator",
    from: deployer,
    log: true,
    args: [BTCIVRate, BTCPriceProvider.address, HegicAtmPut_WBTC.address, 8],
  })

  await execute(
    "HegicWETHCALL",
    {from: deployer, log: true},
    "setPriceCalculator",
    WETHCALLPricer.address,
  )
  await execute(
    "HegicWETHPUT",
    {from: deployer, log: true},
    "setPriceCalculator",
    WETHPUTPricer.address,
  )
  await execute(
    "HegicWBTCCALL",
    {from: deployer, log: true},
    "setPriceCalculator",
    WBTCCALLPricer.address,
  )
  await execute(
    "HegicWBTCPUT",
    {from: deployer, log: true},
    "setPriceCalculator",
    WBTCPUTPricer.address,
  )
}

deployment.tags = ["test", "Pricers"]

export default deployment

export const deployParams = {ETHIVRate, BTCIVRate}
