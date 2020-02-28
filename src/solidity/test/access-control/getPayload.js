const {getTclActors} = require('../../common/test/helpers/address');
const {deployAccessControl} = require('../helpers/deploy');
const {getAccessToken} = require('../../common/utils/accessControl');
const {getMethodSelectorFromAbi} = require('../../common/utils/eth-utils');
const {getPrivateKeyFromAddress} = require('../../common/test/helpers/signatures');

contract('AccessControl: getPayload', accounts => {
  const SYMBOL = 'ERC';
  const nonce = SYMBOL;

  const {authorisedHolder, mainController} = getTclActors(accounts);
  let accessControlInstance;
  let ethSignedMessage;
  let methodSelector;

  beforeEach(async () => {
    accessControlInstance = await deployAccessControl(accounts);
    methodSelector = getMethodSelectorFromAbi(accessControlInstance.abi, 'getPayload');

    ({ethSignedMessage} = getAccessToken({
      privKey: getPrivateKeyFromAddress(mainController),
      bearer: authorisedHolder,
      method: methodSelector,
      nonce,
      restrictedContractAddress: accessControlInstance.address
    }));
  });

  it('should return the correct ETH-hash given the nonce', async () => {
    const hash = await accessControlInstance
      .getPayload(
        methodSelector,
        nonce,
        {from: authorisedHolder}
      );

    expect(hash).to.be.equal(ethSignedMessage);
  });
});
