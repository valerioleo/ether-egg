const {deployEtherEgg} = require('../helpers/deploy');
const {getActors} = require('../../common/test/helpers/address');

contract.only('EtherEgg: claimEgg', accounts => {
  let etherEgg;
  const {hunter} = getActors(accounts);

  beforeEach(async () => {
    etherEgg = await deployEtherEgg(accounts);
  });

  it('should lay an egg and pass it to EtherEgg contract', async () => {
    const solution = 'alice';

    const eggId = await etherEgg.generateId(solution);

    await etherEgg.claimEgg(eggId, {from: hunter});

    const eggOwner = await etherEgg.ownerOf(eggId);

    expect(eggOwner).to.be.equal(hunter);
  });
});
