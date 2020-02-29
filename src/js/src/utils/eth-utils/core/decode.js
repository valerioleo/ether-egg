const abiDecoder = require('eth-abi-decoder');

const decodeMethod = (abi, data) => {
  abiDecoder.addABI(abi);
  return abiDecoder.decodeMethod(data);
};

module.exports = {
  decodeMethod
};
