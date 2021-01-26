const contract = require('@truffle/contract');
const { POOL_START_DATE } = require('./pools');
const knownContracts = require('./known-contracts');

const Cash = artifacts.require('Cash');
const Bond = artifacts.require('Bond');
const Share = artifacts.require('Share');
const IERC20 = artifacts.require('IERC20');
const MockToken = artifacts.require('MockToken');
const MockWETH = artifacts.require('MockWETH');

const Oracle = artifacts.require('Oracle')
const Boardroom = artifacts.require('Boardroom')
const Treasury = artifacts.require('Treasury')
const MockOracle = artifacts.require('MockOracle');

const UniswapV2Factory = artifacts.require('UniswapV2Factory');
const UniswapV2Router02 = artifacts.require('UniswapV2Router02');

const DAY = 86400;

async function migration(deployer, network, accounts) {
  console.log("#############");
  console.log(network);
  console.log("#############");

  let uniswap, uniswapRouter, usdc;
  if (['dev', 'het', 'rinkeby-fork', 'rinkeby', 'ganache', 'ganache-fork'].includes(network)) {
    await deployer.deploy(MockWETH);

    console.log('Deploying uniswap on dev network.');
    await deployer.deploy(UniswapV2Factory, accounts[0]);
    uniswap = await UniswapV2Factory.deployed();

    await deployer.deploy(UniswapV2Router02, uniswap.address, MockWETH.address);
    uniswapRouter = await UniswapV2Router02.deployed();

    usdc = await deployer.deploy(MockToken, 'USD Coin', 'usdc', 6);
  } else {
    uniswap = await UniswapV2Factory.at(knownContracts.UniswapV2Factory[network]);
    uniswapRouter = await UniswapV2Router02.at(knownContracts.UniswapV2Router02[network]);
    usdc = await IERC20.at(knownContracts.USDC[network]);
  }

  console.log(`usdc address: ${usdc.address}`);

  // 2. provide liquidity to POC-usdc and POS-usdc pair
  // if you don't provide liquidity to POC-usdc and POS-usdc pair after step 1 and before step 3,
  //  creating Oracle will fail with NO_RESERVES error.
  const unit = web3.utils.toBN(10 ** 18).toString();
  const unitB = web3.utils.toBN(150 * 10 ** 6).toString();
  const max = web3.utils.toBN(10 ** 18).muln(10000).toString();

  const cash = await Cash.deployed();
  const share = await Share.deployed();

  console.log('Approving Uniswap on tokens for liquidity');
  await Promise.all([
    approveIfNot(cash, accounts[0], uniswapRouter.address, max),
    approveIfNot(share, accounts[0], uniswapRouter.address, max),
    approveIfNot(usdc, accounts[0], uniswapRouter.address, max),
  ]);

  // WARNING: msg.sender must hold enough usdc to add liquidity to POC-usdc & POS-usdc pools
  // otherwise tranPOCtion will revert
  console.log('Adding liquidity to pools');
  await uniswapRouter.addLiquidity(
    cash.address, usdc.address, unit, unitB, unit, unitB, accounts[0], deadline(),
  );
  console.log("###################");
  await uniswapRouter.addLiquidity(
    share.address, usdc.address, unit, unitB, unit, unitB, accounts[0],  deadline(),
  );

  console.log(`USDC-POC pair address: ${await uniswap.getPair(usdc.address, cash.address)}`);
  console.log(`USDC-POS pair address: ${await uniswap.getPair(usdc.address, share.address)}`);

  // Deploy boardroom
  await deployer.deploy(Boardroom, cash.address, share.address);


  let startTime = POOL_START_DATE;
  if (network === 'mainnet') {
    startTime += 5 * DAY;
  }
  /*
  if (['dev', 'het', 'rinkeby-fork', 'rinkeby', 'ganache', 'ganache-fork'].includes(network)) {
    await deployer.deploy(MockOracle);

    // 2. Deploy oracle for the pair between POC and usdc
    await deployer.deploy(
      MockOracle,
      uniswap.address,
      cash.address,
      usdc.address,
      POOL_START_DATE
    );

    await deployer.deploy(
      Treasury,
      cash.address,
      Bond.address,
      Share.address,
      MockOracle.address,
      Boardroom.address,
      uniswapRouter.address,
      startTime,
    );
    } else {

    */

    // 2. Deploy oracle for the pair between POC and usdc
    await deployer.deploy(
      Oracle,
      uniswap.address,
      cash.address,
      usdc.address,
      POOL_START_DATE
    );
    await deployer.deploy(
      Treasury,
      cash.address,
      Bond.address,
      Share.address,
      Oracle.address,
      Boardroom.address,
      uniswapRouter.address,
      startTime,
    );
  //}
}

async function approveIfNot(token, owner, spender, amount) {
  const allowance = await token.allowance(owner, spender);

  if (web3.utils.toBN(allowance).gte(web3.utils.toBN(amount))) {
    return;
  }
  await token.approve(spender, amount);
  console.log(` - Approved ${token.symbol ? (await token.symbol()) : token.address}`);
}

function deadline() {
  // 30 minutes
  return Math.floor(new Date().getTime() / 1000) + 1800;
}

module.exports = migration;
