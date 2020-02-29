var EtherEgg = artifacts.require("./EtherEgg.sol");

module.exports = (deployer) => {
  deployer.deploy(EtherEgg, 'ethereggs', 'EGG');
};
