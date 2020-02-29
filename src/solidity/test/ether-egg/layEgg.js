const {deployEtherEgg} = require('../helpers/deploy');

contract('EtherEgg: layEgg', accounts => {
  let etherEgg;

  beforeEach(async () => {
    etherEgg = await deployEtherEgg(accounts);
  });

  it('should lay an egg and pass it to EtherEgg contract', async () => {
    const solution = 'alice';

    const eggId = await etherEgg.generateId(solution);
    await etherEgg.layEgg(eggId);

    const eggOwner = await etherEgg.ownerOf(eggId);

    expect(eggOwner).to.be.equal(etherEgg.address);
  });
});
