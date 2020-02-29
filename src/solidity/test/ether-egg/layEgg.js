const {deployEtherEgg} = require('../helpers/deploy');
const {shouldFailWithMessage} = require('../../common/test/helpers/utils');

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

  it('should prevent laying two eggs with same solution', async () => {
    const solution = 'alice';

    const eggId = await etherEgg.generateId(solution);

    await shouldFailWithMessage(
      etherEgg.layEgg(eggId),
      'Already exists'
    );
  });
});
