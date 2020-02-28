const {expectRevert} = require('openzeppelin-test-helpers');

const expectVMException = expectRevert.unspecified;
const expectInvalidOpCode = expectRevert.invalidOpcode;
const shouldFailWithMessage = expectRevert;

const toHex = value => web3.utils.toHex(value);
const hexToBytes = hex => web3.utils.hexToBytes(hex);
const hexToUtf8 = hex => web3.utils.hexToUtf8(hex);
const bytesToHex = bytes => web3.utils.bytesToHex(bytes);
const padLeft = (str, charAmount) => web3.utils.padLeft(str, charAmount);
const padRight = (str, charAmount) => web3.utils.padRight(str, charAmount);
const {soliditySha3} = web3.utils;
const {encodeFunctionSignature} = web3.eth.abi;
const asciiToHex = str => web3.utils.asciiToHex(str);
const encodeBytes32Param = str => asciiToHex(str);


module.exports = {
  expectVMException,
  expectInvalidOpCode,
  shouldFailWithMessage,
  toHex,
  hexToBytes,
  hexToUtf8,
  bytesToHex,
  padLeft,
  padRight,
  soliditySha3,
  encodeFunctionSignature,
  encodeBytes32Param
};
