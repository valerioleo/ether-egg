const ethTransactionLink = network => txHash => `https://${network === 'kovan' ? 'kovan.' : ''}etherscan.io/tx/${txHash}`;
const contractLink = network => address => `https://${network === 'kovan' ? 'kovan.' : ''}etherscan.io/address/${address}`;
const tokenLink = network => address => `https://${network === 'kovan' ? 'kovan.' : ''}etherscan.io/token/${address}`;
const tokenBalanceAccountLink = network => (tokenAddress, accountAddress) => `https://${network === 'kovan' ? 'kovan.' : ''}etherscan.io/token/${tokenAddress}?a=${accountAddress}`;

module.exports = {
  ethTransactionLink,
  contractLink,
  tokenLink,
  tokenBalanceAccountLink
};
