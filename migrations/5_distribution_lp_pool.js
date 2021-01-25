const knownContracts = require('./known-contracts');
const { POOL_START_DATE } = require('./pools');
const IERC20 = artifacts.require('IERC20');

const Cash = artifacts.require('Cash');
const Share = artifacts.require('Share');
const Oracle = artifacts.require('Oracle');
const MockOracle = artifacts.require('MockOracle');
const MockToken = artifacts.require('MockToken');

const USDCPOCLPToken_POSPool = artifacts.require('USDCPOCLPTokenSharePool')
const USDCPOSLPToken_POSPool = artifacts.require('USDCPOSLPTokenSharePool')

const UniswapV2Factory = artifacts.require('UniswapV2Factory');

module.exports = async (deployer, network, accounts) => {
  const devAddr = accounts[0]
  const uniswapFactory = ['dev', 'het', 'rinkeby-fork', 'rinkeby', 'ganache', 'ganache-fork'].includes(network)
    ? await UniswapV2Factory.deployed()
    : await UniswapV2Factory.at(knownContracts.UniswapV2Factory[network]);
  const usdc = ['dev', 'het', 'rinkeby-fork', 'rinkeby', 'ropsten', 'ropsten-fork', 'ganache', 'ganache-fork'].includes(network)
    ? await MockToken.deployed()
    : await IERC20.at(knownContracts.USDC[network]);

  let oracle = await Oracle.deployed();

  const usdc_poc_lpt = await oracle.pairFor(uniswapFactory.address, Cash.address, usdc.address);
  const usdc_pos_lpt = await oracle.pairFor(uniswapFactory.address, Share.address, usdc.address);

  await deployer.deploy(USDCPOCLPToken_POSPool, Share.address, usdc_poc_lpt, POOL_START_DATE, devAddr);
  await deployer.deploy(USDCPOSLPToken_POSPool, Share.address, usdc_pos_lpt, POOL_START_DATE, devAddr);
};
