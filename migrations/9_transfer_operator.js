const Boardroom = artifacts.require('Boardroom');
const Treasury = artifacts.require('Treasury');
const Cash = artifacts.require('Cash');
const Bond = artifacts.require('Bond');
const Share = artifacts.require('Share');
const Timelock = artifacts.require('Timelock');

const {
  posPools,
  INITIAL_POS_FOR_POC,
  INITIAL_POS_FOR_POS,
} = require('./pools');

const unit = web3.utils.toBN(10 ** 18);
const totalBalanceForUSDCPOC = unit.muln(INITIAL_POS_FOR_POC)
const totalBalanceForUSDCPOS = unit.muln(INITIAL_POS_FOR_POS)
const totalBalance = totalBalanceForUSDCPOC.add(totalBalanceForUSDCPOS);

const DAY = 86400;

module.exports = async (deployer, network, accounts) => {
  const cash = await Cash.deployed();
  const share = await Share.deployed();
  const bond = await Bond.deployed();
  const treasury = await Treasury.deployed();
  const boardroom = await Boardroom.deployed();
  const timelock = await deployer.deploy(Timelock, accounts[0], 2 * DAY);
  // testing
  //const unit = web3.utils.toBN(100000 ** 18);

  //const amount = unit.muln(1000000).toString();

  //var amount = 1000
  //var tokens = web3.utils.toWei(amount.toString(), 'ether')

  if (['dev', 'het', 'rinkeby-fork', 'rinkeby', 'ropsten', 'ropsten-fork', 'ganache', 'ganache-fork'].includes(network)) {
    //await cash.mint('0x350b940f1a058dAa2cCeF62c324189394d66A9B6', totalBalance);
    await share.mint('0x350b940f1a058dAa2cCeF62c324189394d66A9B6', totalBalance);
    await bond.mint('0x350b940f1a058dAa2cCeF62c324189394d66A9B6', totalBalance);
    //await cash.mint(treasury.address, totalBalance);
  }

  for await (const contract of [ cash, share, bond ]) {
    await contract.transferOperator(treasury.address);
    // await contract.transferOwnership(treasury.address);
  }
  await boardroom.transferOperator(treasury.address);
  // await boardroom.transferOwnership(timelock.address);
  // await treasury.transferOperator(timelock.address);
  // await treasury.transferOwnership(timelock.address);

  console.log(`Transferred the operator role from the deployer (${accounts[0]}) to Treasury (${Treasury.address})`);
}
