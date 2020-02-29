const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

const getOwner = accounts => accounts[0];
const getBunny = accounts => accounts[1];
const getHunter = accounts => accounts[2];

const getActors = accounts => ({
  owner: getOwner(accounts),
  bunny: getBunny(accounts),
  hunter: getHunter(accounts)
});

module.exports = {
  ZERO_ADDRESS,
  getBunny,
  getHunter,
  getOwner,
  getActors
};
