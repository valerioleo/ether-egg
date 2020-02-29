const {getWeb3} = require('./web3');

const BigNumber = getWeb3().utils.toBN;
const getBlockNumber = async () => await getWeb3().eth.getBlockNumber();
const getBlock = async blockNumber => await getWeb3().eth.getBlock(blockNumber);
const fromWei = (unit, num) => getWeb3().utils.fromWei(`${num}`, unit);
const toWei = (unit, num) => getWeb3().utils.toWei(`${num}`, unit);
const getTokens = tokens => getWeb3().utils.toBN(toWei('ether', tokens));
const toFinney = (unit, num) => getWeb3().utils.fromWei(getWeb3().utils.toWei(`${num}`, unit), 'finney');
const toFinneyNumber = (unit, num) => Number(toFinney('wei', BigNumber(toWei(unit, num)).toString()));

const fromFinney = (unit, finney) => {
  const wei = getWeb3().utils.toWei(`${finney}`, 'finney');
  return getWeb3().utils.fromWei(`${wei}`, unit);
};

module.exports = {
  BigNumber,
  getBlockNumber,
  getBlock,
  fromWei,
  toWei,
  toFinney,
  toFinneyNumber,
  fromFinney,
  getTokens
};
