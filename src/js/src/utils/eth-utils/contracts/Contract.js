const {Contract: Web3Contract} = require('../core/web3');
const {getDefaultAccount} = require('../data/address');
const {
  estimateGas,
  estimateDeployGas,
  once,
  on,
  getDeployData
} = require('../core/tx');

const getContract = ContractDefinition => new Web3Contract(ContractDefinition.abi);

const getContractInstance = (ContractDefinition, address) => new Web3Contract(ContractDefinition.abi, address);

const getStateMutability = (jsonInterface, method) => {
  const methodObject = jsonInterface.find(val => val.name === method);
  if(methodObject) {
    return methodObject.stateMutability;
  }
  throw new Error('Method not found in interface');
};

const callContractMethod = async (contractInstance, method, ...args) => {
  const {defaultAccount: from} = await getDefaultAccount();
  const methodArgs = args.length
    ? [...args]
    : [];

  return await contractInstance.methods[method](...methodArgs).call({from});
};

const sendTransactionRoot = waitTransactionConfirmation => async (contractInstance, method, ...args) => {
  try {
    const {defaultAccount: from} = await getDefaultAccount();

    const gasArgs = args.length
      ? [contractInstance.methods[`${method}`], from, ...args]
      : [contractInstance.methods[`${method}`], from];

    const methodArgs = args.length
      ? [...args]
      : [];

    const gasLimit = await estimateGas(...gasArgs);

    if(waitTransactionConfirmation) {
      return await on('receipt', contractInstance.methods[method](...methodArgs).send({from, gas: gasLimit}));
    }

    return await once('transactionHash', contractInstance.methods[method](...methodArgs).send({from, gas: gasLimit}));
  }
  catch(error) {
    console.log(`Error calling a method ${method} for contract ${contractInstance._address}: ${error.message}`);
    if(error.message.includes('User denied transaction')) {
      throw new Error('User denied transaction signature.');
    }
    else {
      throw new Error('Transaction not transmitted due to an error');
    }
  }
};

const encodeMethod = (contractInstance, method, ...args) => {
  try {
    const methodArgs = args.length
      ? [...args]
      : [];

    return contractInstance.methods[method](...methodArgs).encodeABI();
  }
  catch(error) {
    throw new Error('Could not get encode method');
  }
};

const deploy = awaitReceipt => async (contract, ContractDefinition, args) => {
  const {defaultAccount} = await getDefaultAccount();
  const gas = await estimateDeployGas(
    contract,
    ContractDefinition.bytecode,
    defaultAccount,
    args
  );

  const deployArgs = {data: ContractDefinition.bytecode, arguments: args};
  const sendArgs = {from: defaultAccount, gas};

  const myContract = new Web3Contract(ContractDefinition.abi);
  if(awaitReceipt) {
    return myContract
      .deploy(deployArgs)
      .send(sendArgs);
  }

  return await new Promise(res => myContract
    .deploy(deployArgs)
    .send(sendArgs)
    .on('transactionHash', res));
};

const importDefinition = async contractInterface => {
  try {
    return await import(/* webpackChunkName: "contract-definition-" */ `../../../../../solidity/build/contracts/${contractInterface}.json`);
  }
  catch(error) {
    throw Error(`Error while importing definition for ${contractInterface}: ${error.message}`);
  }
};

const deployContract = awaitReceipt => async (ContractDefinition, constructorParams) => {
  try {
    const contract = new Web3Contract(ContractDefinition.abi);

    return await deploy(awaitReceipt)(contract, ContractDefinition, constructorParams);
  }
  catch(error) {
    throw error;
  }
};

const getContractDeployData = (contractDefinition, ...args) => getDeployData(
  getContract(contractDefinition),
  contractDefinition.bytecode,
  ...args
);

module.exports = {
  importDefinition,
  getContract,
  getContractInstance,
  sendTransaction: sendTransactionRoot(false),
  sendTransactionAndWaitConfirmation: sendTransactionRoot(true),
  deployContract: deployContract(false),
  deployContractAndAwaitReceipt: deployContract(true),
  encodeMethod,
  getContractDeployData,
  callContractMethod
};

