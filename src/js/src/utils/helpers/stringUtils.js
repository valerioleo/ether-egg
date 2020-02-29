
const toSentenceCase = string => string
  .replace(/([A-Z])/g, ' $1')
  .replace(/^./, str => str.toUpperCase());

const toLowerCase = string => String(string).toLowerCase();

module.exports = {
  toSentenceCase,
  toLowerCase
};
