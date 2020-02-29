const {
  getWeb3,
  enableAccountAccess
} = require('../core/web3');

const web3 = getWeb3();

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

const {getAccounts} = web3.eth;

const isValidAddress = address => web3.utils.isAddress(address);

const getDefaultAccount = async () => {
  let accounts = await getAccounts();
  if(accounts.length === 0) {
    await enableAccountAccess();
    accounts = await getAccounts();
  }

  const defaultAccount = accounts[0]
    ? accounts[0].toLowerCase()
    : undefined;

  return {defaultAccount};
};

const compareAddress = (addr1, addr2) => {
  if(!addr1 || !addr2) return false;

  return addr1.toLowerCase() === addr2.toLowerCase();
};

module.exports = {
  ZERO_ADDRESS,
  getAccounts,
  getDefaultAccount,
  isValidAddress,
  compareAddress
};
