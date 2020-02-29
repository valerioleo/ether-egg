const EtherEgg = artifacts.require('EtherEgg');
const {getActors} = require('../../common/test/helpers/address');

const deployEtherEgg = async accounts => {
  const {owner} = getActors(accounts);
  const etherEgg = await EtherEgg.new({from: owner});

  return etherEgg;
};

module.exports = {
  deployEtherEgg
};
