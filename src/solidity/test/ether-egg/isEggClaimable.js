const {shouldFailWithMessage} = require('../../common/test/helpers/utils');
const {deployEtherEgg} = require('../helpers/deploy');
const {getWeb3} = require('../../common/utils/web3');
const {getActors} = require('../../common/test/helpers/address');

contract('EtherEgg: isEggClaimable', accounts => {
  let etherEgg;
  const web3 = getWeb3();

  const {hunter} = getActors(accounts);

  beforeEach(async () => {
    etherEgg = await deployEtherEgg(accounts);
  });

  it('should return false if the egg is not claimable', async () => {
    const solution = 'random';

    await shouldFailWithMessage(
      etherEgg.isEggClaimable(solution),
      'ERC721: owner query for nonexistent token'
    );
  });

  it('should return true if the egg is claimable', async () => {
    const solution = 'alice';

    const eggId = await etherEgg.generateId(solution);
    await etherEgg.layEgg(eggId);

    const isEggClaimable = await etherEgg.isEggClaimable(solution);

    expect(isEggClaimable).to.be.equal(true);
  });

  it('should return false if the egg was claimable, but is not anymore', async () => {
    const solution = 'alice';
    let isEggClaimable = false;

    const eggId = await etherEgg.generateId(solution);
    await etherEgg.layEgg(eggId);

    isEggClaimable = await etherEgg.isEggClaimable(solution);
    expect(isEggClaimable).to.be.equal(true);

    await etherEgg.claimEgg(eggId, {from: hunter});

    isEggClaimable = await etherEgg.isEggClaimable(solution);
    expect(isEggClaimable).to.be.equal(false);
  });
});
