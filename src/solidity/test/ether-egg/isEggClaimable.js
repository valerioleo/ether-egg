const {deployEtherEgg} = require('../helpers/deploy');
const {getWeb3} = require('../../common/utils/web3');

contract('EtherEgg: isEggClaimable', accounts => {
  let etherEgg;
  const web3 = getWeb3();

  beforeEach(async () => {
    etherEgg = await deployEtherEgg(accounts);
  });

  it('should return true if the egg is claimable', async () => {
    const solution = 'alice';

    const isEggClaimable = await etherEgg.isEggClaimable(solution);

    expect(isEggClaimable).to.be.equal(true);
  });
});
