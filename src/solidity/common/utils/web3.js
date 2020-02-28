const Web3 = require('web3');
const Maybe = require('folktale/maybe');

let _web3 = Maybe.Nothing();

const getProvider = () => {
  if(global.ethereum) {
    return global.ethereum;
  }

  if(global.web3) {
    return global.web3.currentProvider;
  }

  return new Web3.providers.HttpProvider(process.env.WEB3_HTTP_PROVIDER);
};

const enableAccountAccess = async () => {
  try {
    if(global.ethereum) {
      return await global.ethereum.enable();
    }
  }
  catch(error) {
    console.log('Denied access to account');
    throw error;
  }
};

const getWeb3 = () => _web3.matchWith({
  Just: ({value}) => value,
  Nothing: () => {
    const provider = getProvider();
    const _web3Inst = new Web3(provider);

    _web3 = Maybe.fromNullable(_web3Inst);

    return _web3Inst;
  }
});

const {Contract} = getWeb3().eth;

module.exports = {
  getWeb3,
  enableAccountAccess,
  getProvider,
  Contract
};
