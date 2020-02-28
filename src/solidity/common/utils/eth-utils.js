const {getWeb3} = require('./web3');

const {soliditySha3} = getWeb3().utils;
const signDataWithPrivateKey = (data, privKey) => getWeb3().eth.accounts.sign(data, privKey);

const compareAddress = (addr1 = '', addr2 = '') => {
  if (!addr1 || !addr2) return false;

  return addr1.toLowerCase() === addr2.toLowerCase();
};

const getMethodSelectorFromAbi = (abi, method) => {
  const abiMethod = abi.find(({name}) => name === method);

  if (abiMethod) {
    return abiMethod.signature;
  }
};

module.exports = {
  soliditySha3,
  compareAddress,
  signDataWithPrivateKey,
  getMethodSelectorFromAbi
};
