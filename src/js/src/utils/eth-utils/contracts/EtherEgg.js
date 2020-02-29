const EtherEgg = require('../../../../../solidity/build/contracts/EtherEgg.json');
const {getContractInstance, callContractMethod} = require('./Contract');
const {partial} = require('../../fn');

const getTokenInstance = partial(getContractInstance, EtherEgg);

const callMethod = (
  contractAddress,
  method,
  ...args
) => callContractMethod(getTokenInstance(contractAddress), method, ...args);

const getBalance = async (tokenAddress, distAddress) => await callMethod(
  tokenAddress,
  'balanceOf',
  distAddress
);

module.exports = {
  getTokenInstance,
  callMethod,
  getBalance
};
