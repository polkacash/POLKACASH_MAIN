const INITIAL_POC_FOR_POOLS = 240000;
const INITIAL_POS_FOR_POC = 600000;
const INITIAL_POS_FOR_POS = 230000;

const POOL_START_DATE = Date.parse('2021-01-26T12:00:00Z') / 1000;
//const POOL_START_DATE = Date.parse('2021-01-18T12:00:00Z') / 1000;

const pocPools = [
  { contractName: 'POCDAIPool', token: 'DAI' },
  { contractName: 'POCFRAXPool', token: 'FRAX' },
  { contractName: 'POCUSDTPool', token: 'USDT' },
  { contractName: 'POCUSDCPool', token: 'USDC' },
  { contractName: 'POCESDPool', token: 'ESD' },
  { contractName: 'POCRAMPPool', token: 'RAMP' },
  { contractName: 'POCUFTPool', token: 'UFT' },
  { contractName: 'POCINJPool', token: 'INJ' },
  { contractName: 'POCBNBPool', token: 'BNB'},
  { contractName: 'POCUSDXPool', token: 'USDX' },
  { contractName: 'POCFIREPool', token: 'FIRE' },
  { contractName: 'POCDUCKPool', token: 'DUCK' },
];

const posPools = {
  USDCPOC: { contractName: 'USDCPOCLPTokenSharePool', token: 'USDC_POC-LPv2' },
  USDCPOS: { contractName: 'USDCPOSLPTokenSharePool', token: 'USDC_POS-LPv2' },
}

module.exports = {
  POOL_START_DATE,
  INITIAL_POC_FOR_POOLS,
  INITIAL_POS_FOR_POC,
  INITIAL_POS_FOR_POS,
  pocPools,
  posPools,
};
