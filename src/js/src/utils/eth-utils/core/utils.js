const {getWeb3} = require('./web3');

const getNetwork = () => getWeb3().version.network || 1;

const networkNames = {
  0: '',
  1: 'mainnet',
  2: 'morden',
  3: 'ropsten',
  4: 'rinkeby',
  42: 'kovan'
};

const networkNamesInverse = {
  '': 0,
  mainnet: 1,
  morden: 2,
  ropsten: 3,
  rinkeby: 4,
  kovan: 42
};

const getTransactionUrl = txHash => {
  const network = networkNames[getNetwork()];

  return `https://${network === 'mainnet' ? 'www' : network}.etherscan.io/tx/${txHash}`;
};

const getNetworkId = network => networkNamesInverse[network];

const toSolDate = ts => Math.floor(ts / 1000);
const fromSolDate = ts => Math.floor(ts * 1000);
const getSolNow = () => toSolDate(Date.now());

// prefer the bignumber.js, which is used in web3@0.X as it supports decimals
const toHex = value => getWeb3().utils.toHex(value);
const toTokenHex = tokens => toHex(new BigNumber(1e+18).times(tokens));
const isAddressValid = address => getWeb3().utils.isAddress(address);
const sha3 = str => getWeb3().utils.sha3(str);
const isSmartContract = async address => {
  const bytecode = await getWeb3().eth.getCode(address);
  return bytecode !== '0x';
};
const soliditySha3 = (...values) => getWeb3().utils.soliditySha3(...values);
const createAccountId = (...values) => soliditySha3(...values);
const hexToBytes = value => getWeb3().utils.hexToBytes(value);
const asciiToHex = str => getWeb3().utils.asciiToHex(str);
const hexToUtf8 = hex => getWeb3().utils.hexToUtf8(hex);
const encodeBytes32Param = str => asciiToHex(str);

const {BN} = getWeb3().utils;

const EMPTY_SOLIDITY_DATA = hexToBytes(toHex('empty_bytes_data'));

module.exports = {
  getNetworkId,
  toSolDate,
  fromSolDate,
  toTokenHex,
  isAddressValid,
  sha3,
  toHex,
  isSmartContract,
  soliditySha3,
  createAccountId,
  hexToBytes,
  hexToUtf8,
  encodeBytes32Param,
  getSolNow,
  EMPTY_SOLIDITY_DATA,
  getTransactionUrl,
  BN
};
