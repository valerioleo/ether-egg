const {BigNumber, toWei, toFinneyNumber} = require('./core/v1');

const sumReducer = key => (acc, p) => acc.add(BigNumber(toWei('finney', p.get(key))));

const ethSumReducer = (data, key) => toFinneyNumber('wei', data.reduce(sumReducer(key), BigNumber(0)));

module.exports = {
  ethSumReducer
};

