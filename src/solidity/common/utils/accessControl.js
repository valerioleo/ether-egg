const {signDataWithPrivateKey, soliditySha3} = require('./eth-utils');

const getAccessTokenMessage = ({
  restrictedContractAddress,
  method,
  bearer,
  nonce
}) => soliditySha3(
  restrictedContractAddress,
  method,
  bearer,
  nonce
);

const getAccessToken = ({privKey, ...rest}) => {
  const hashedMessage = getAccessTokenMessage(rest);

  const fullSig = signDataWithPrivateKey(hashedMessage, privKey);
  const {
    signature: accessToken,
    message: originalMessage,
    messageHash: ethSignedMessage // More details here: https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_sign
  } = fullSig;

  return {
    accessToken,
    originalMessage,
    ethSignedMessage
  };
};

module.exports = {
  getAccessToken
};
