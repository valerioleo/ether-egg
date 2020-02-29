const ethUtil = require('ethereumjs-util');
const EthereumTx = require('ethereumjs-tx').Transaction;
const {getWeb3} = require('./web3');
const {getNetworkId, toHex} = require('./utils');

const privateToAddress = privKey => {
  const addressBuffer = ethUtil.privateToAddress(ethUtil.toBuffer(privKey));
  return `0x${addressBuffer.toString('hex')}`;
};

const signTransaction = async (privKey, nonce, to, value, data, gasLimit, gasPrice) => {
  // tx.js is used by the front as well and this line causes it to fails; so we add it here
  const privateKey = Buffer.from(privKey, 'hex');
  const txParams = {
    nonce: toHex(nonce),
    gasPrice: toHex(gasPrice),
    gasLimit: toHex(gasLimit),
    to,
    value: toHex(value),
    data
  };

  const tx = new EthereumTx(txParams, {chain: getNetworkId(process.env.ETHEREUM_NETWORK)});
  tx.sign(privateKey);

  return tx.serialize();
};

const getAccountNonce = async address => {
  try {
    return await getWeb3().eth.getTransactionCount(address);
  }
  catch(error) {
    throw error;
  }
};

const estimateGas = async (method, from, ...params) => {
  try {
    return await method(...params).estimateGas({from});
  }
  catch(error) {
    throw error;
  }
};

const getCurrentGasPrice = async () => {
  try {
    return await getWeb3().eth.getGasPrice();
  }
  catch(error) {
    throw Error(`Error running getCurrentGasPrice due to ${error.message}`);
  }
};

const getData = (method, ...params) => method(...params).encodeABI();

const sendRawTransaction = async (serializedTx, waitForReceipt=false) => {
  try {
    if(waitForReceipt) {
      return await getWeb3()
        .eth
        .sendSignedTransaction(
          ethUtil.addHexPrefix(serializedTx.toString('hex'))
        );
    }

    return await once(
      'transactionHash',
      getWeb3()
      .eth
      .sendSignedTransaction(
        ethUtil.addHexPrefix(serializedTx.toString('hex'))
      )
    )
  }
  catch(error) {
    throw error;
  }
};

const getBlock = async blockNumber => await getWeb3().eth.getBlock(blockNumber);

const getDeployData = (Contract, bytecode, ...args) => Contract
  .deploy({
    data: bytecode,
    arguments: args
  })
  .encodeABI();

const estimateDeployGas = async (contract, data, from, args) => await contract
  .deploy({data, arguments: args}).estimateGas({from});

const sendTransaction = params => {
  const send = getWeb3().eth.sendTransaction;
  return send(params);
};

const waitForTxConfirmations = (txHash, confirmations = 12) => {
  const web3 = getWeb3();
  const filter = web3.eth.filter('latest');
  return new Promise((resolve, reject) => {
    const subscription = filter.watch(error => {
      if(!error) {
        const confirmedBlock = web3.eth.getBlock(web3.eth.blockNumber - confirmations);
        const found = confirmedBlock.transactions.find(txId === txHash);
        if(found) {
          subscription.stopWatching();
          return resolve();
        }
        reject();
      }
    });
  });
};

const getTransactionReceiptMined = txHash => new Promise((resolve, reject) => {
  const transactionReceiptAsync = async (resolve, reject) => {
    const {getTransactionReceipt} = getWeb3().eth;
    const receipt = await getTransactionReceipt(txHash);
    if(receipt === null) {
      setTimeout(() => transactionReceiptAsync(resolve, reject), 500);
    }
    else {
      resolve(receipt);
    }
  };
  transactionReceiptAsync(resolve, reject);
});

const getTransaction = txHash => getWeb3().eth.getTransaction(txHash);
const getTransactionReceipt = txHash => getWeb3().eth.getTransactionReceipt(txHash);

const signAndSendTxRoot = waitForReceipt => async (
  contractAddress,
  method,
  privKey,
  value,
  ...args
) => {
  try {
    const from = privateToAddress(`0x${privKey}`);
    const gasPrice = await getCurrentGasPrice();
    const methodGas = await estimateGas(method, from, ...args);
    const methodData = getData(method, ...args);
    const nonce = await getAccountNonce(from);
    const methodRawTransaction = await signTransaction(
      privKey,
      nonce,
      contractAddress,
      value,
      methodData,
      methodGas,
      gasPrice
    );

    return await sendRawTransaction(methodRawTransaction, waitForReceipt);
  }
  catch(error) {
    throw Error(`signAndSendAndTx failed: ${error.message}`);
  }
};

const once = (event, tx) => new Promise((resolve, reject) => tx
  .once(event, resolve)
  .on('error', reject));

const on = (event, tx) => new Promise((resolve, reject) => tx
  .on(event, resolve)
  .on('error', reject));

module.exports = {
  privateToAddress,
  estimateGas,
  getTransaction,
  getTransactionReceipt,
  getBlock,
  getDeployData,
  estimateDeployGas,
  sendTransaction,
  getTransactionReceiptMined,
  waitForTxConfirmations,
  signAndSendAndWaitTx: signAndSendTxRoot(true),
  signAndSendTx: signAndSendTxRoot(false),
  once,
  on
};
