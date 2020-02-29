const sortBy = require('lodash.sortby');
const {getTokenInstance} = require('../contracts/EtherEgg');
const {getBlock} = require('../core');
const {fromSolDate} = require('../core/utils');

const readLogs = async (tokenContract, eventType, fromBlock, toBlock = 'latest') => {
  if(fromBlock === toBlock) {
    return [];
  }

  const logs = await tokenContract.getPastEvents(eventType, {fromBlock, toBlock});
  const sortedLogs = sortBy(logs, ['blockNumber', 'logIndex']);

  return sortedLogs.map(log => ({
    logIndex: log.logIndex,
    address: log.address,
    from: log.returnValues.from,
    to: log.returnValues.to,
    amount: log.returnValues.value,
    blockNumber: log.blockNumber,
    txHash: log.transactionHash
  }));
};

const getBlockTimestamps = async transfer => {
  const block = await getBlock(transfer.blockNumber);
  return {...transfer, timestamp: fromSolDate(block.timestamp)};
};

const getTransferEvents = async (fromBlock, tokenAddress, blockRange) => {
  try {
    return readLogs(
      getTokenInstance(tokenAddress),
      'Transfer',
      fromBlock,
      fromBlock + blockRange
    );
  }
  catch(error) {
    throw new Error(`Could not load transfer events for the token ${tokenAddress}: ${error.message || error}`);
  }
};

module.exports = {
  getTransferEvents,
  getBlockTimestamps
};
