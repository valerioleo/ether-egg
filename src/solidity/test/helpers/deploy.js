/* eslint-disable no-shadow */
const AccessControl = artifacts.require('AccessControl');
const {getTclActors} = require('../../common/test/helpers/address');

const deployAccessControl = async accounts => {
  const {owner} = getTclActors(accounts);

  const accessControl = await AccessControl.new();
  await accessControl.addSigner(owner);

  return accessControl;
};

module.exports = {
  deployAccessControl
};
