const {shouldFailWithMessage} = require('../../common/test/helpers/utils');
const {getActors} = require('../../common/test/helpers/address');
const {getAccessToken} = require('../../common/utils/accessControl');
const {deployMockRestrictedAccess} = require('../helpers/deploy');
const {getPrivateKeyFromAddress} = require('../../common/test/helpers/signatures');
const {getMethodSelectorFromAbi} = require('../../common/utils/eth-utils');

contract('AccessControl: _whenAuthorised', accounts => {
  const SYMBOL = 'ERC';
  const nonce = SYMBOL;
  let methodSelector;

  const {owner, bunny, hunter} = getActors(accounts);
  let accessControlledContract;
  let accessToken;

  beforeEach(async () => {
    accessControlledContract = await deployMockRestrictedAccess(accounts);
    methodSelector = getMethodSelectorFromAbi(accessControlledContract.abi, 'doSomething');

    ({accessToken} = getAccessToken({
      privKey: getPrivateKeyFromAddress(owner),
      method: methodSelector,
      bearer: bunny,
      nonce,
      restrictedContractAddress: accessControlledContract.address
    }));
  });

  it('should allow authorised users', async () => {
    await accessControlledContract
      .doSomething(nonce, accessToken, {from: bunny});
  });

  it('should not allow impersonated users', async () => {
    await shouldFailWithMessage(
      accessControlledContract
        .doSomething(nonce, accessToken, {from: hunter}),
      'Invalid Access Token'
    );
  });

  it('should not allow same nonce twice', async () => {
    await accessControlledContract
      .doSomething(nonce, accessToken, {from: bunny});

    await shouldFailWithMessage(
      accessControlledContract
        .doSomething(nonce, accessToken, {from: bunny}),
      'Nonce already used'
    );
  });

  it('should not allow non-signer roles to create access token', async () => {
    const {accessToken: invalidAccessToken} = getAccessToken({
      privKey: getPrivateKeyFromAddress(bunny),
      method: methodSelector,
      bearer: bunny,
      nonce,
      restrictedContractAddress: accessControlledContract.address
    });

    await shouldFailWithMessage(
      accessControlledContract
        .doSomething(nonce, invalidAccessToken, {from: bunny}),
      'Invalid Access Token'
    );
  });
});
