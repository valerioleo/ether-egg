/* eslint-disable no-shadow */
const AccessControl = artifacts.require('AccessControl');
const MockRestrictedAccess = artifacts.require('MockRestrictedAccess');
const {getActors} = require('../../common/test/helpers/address');

const deployAccessControl = async accounts => {
  const {owner} = getActors(accounts);

  const accessControl = await AccessControl.new();
  await accessControl.addSigner(owner);

  return accessControl;
};

const deployMockRestrictedAccess = async accounts => {
  const {bunny} = getActors(accounts);

  const accessControl = await MockRestrictedAccess.new();
  await accessControl.addSigner(bunny);

  return accessControl;
};

module.exports = {
  deployAccessControl,
  deployMockRestrictedAccess
};
