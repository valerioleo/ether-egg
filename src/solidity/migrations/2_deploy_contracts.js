const EtherEgg = artifacts.require('EtherEgg');

module.exports = deployer => {
  deployer.deploy(EtherEgg);
};
