const {deployEtherEgg} = require('../helpers/deploy');
const {getActors} = require('../../common/test/helpers/address');

contract('EtherEgg: claimEgg', accounts => {
  let etherEgg;
  const {hunter} = getActors(accounts);

  beforeEach(async () => {
    etherEgg = await deployEtherEgg(accounts);
  });

  it('should lay an egg and transfer it to hunter', async () => {
    const solution = 'alice';
    let eggOwner;

    const eggId = await etherEgg.generateId(solution);
    await etherEgg.layEgg(eggId);

    eggOwner = await etherEgg.ownerOf(eggId);
    expect(eggOwner).to.be.equal(etherEgg.address);

    await etherEgg.claimEgg(solution, {from: hunter});

    eggOwner = await etherEgg.ownerOf(eggId);
    expect(eggOwner).to.be.equal(hunter);
  });
});
