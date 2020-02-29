const {deployEtherEgg} = require('../helpers/deploy');
const {getWeb3} = require('../../common/utils/web3');

contract('EtherEgg: generateId', accounts => {
  let etherEgg;
  const web3 = getWeb3();

  beforeEach(async () => {
    etherEgg = await deployEtherEgg(accounts);
  });

  it('should return the correct hash given the solution', async () => {
    const solution = 'alice';

    const resultHash = await etherEgg.generateId(solution);
    const web3Hash = web3.utils.sha3(solution);

    expect(`0x${resultHash.toString('hex')}`).to.be.equal(web3Hash);
  });
});
