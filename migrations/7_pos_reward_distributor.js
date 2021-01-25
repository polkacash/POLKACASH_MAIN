const {
  posPools,
  INITIAL_POS_FOR_POC,
  INITIAL_POS_FOR_POS,
} = require('./pools');

// Pools
// deployed first
const Share = artifacts.require('Share');
const InitialShareDistributor = artifacts.require('InitialShareDistributor');

// ============ Main Migration ============

async function migration(deployer, network, accounts) {
  const unit = web3.utils.toBN(10 ** 18);
  const totalBalanceForUSDCPOC = unit.muln(INITIAL_POS_FOR_POC)
  const totalBalanceForUSDCPOS = unit.muln(INITIAL_POS_FOR_POS)
  const totalBalance = totalBalanceForUSDCPOC.add(totalBalanceForUSDCPOS);
  const share = await Share.deployed();
  const lpPoolUSDCPOC = artifacts.require(posPools.USDCPOC.contractName);
  const lpPoolUSDCPOS = artifacts.require(posPools.USDCPOS.contractName);

  await deployer.deploy(
    InitialShareDistributor,
    share.address,
    lpPoolUSDCPOC.address,
    totalBalanceForUSDCPOC.toString(),
    lpPoolUSDCPOS.address,
    totalBalanceForUSDCPOS.toString(),
  );

  const distributor = await InitialShareDistributor.deployed();

  await share.mint(distributor.address, totalBalance.toString());
  console.log(`Deposited ${INITIAL_POS_FOR_POC} POS to InitialShareDistributor.`);

  console.log(`Setting distributor to InitialShareDistributor (${distributor.address})`);
  await lpPoolUSDCPOC.deployed().then(pool => pool.setRewardDistribution(distributor.address));
  await lpPoolUSDCPOS.deployed().then(pool => pool.setRewardDistribution(distributor.address));

  await distributor.distribute();
}

module.exports = migration;
