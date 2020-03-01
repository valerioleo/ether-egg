import {BN} from '../core/utils';

const EtherEggConvertor = {
  generateId: ({solution}) => [solution],
  layEgg: value => [new BN(value.eggId)]
};

const OperationsParamsConvertor = {
  EtherEgg: EtherEggConvertor
};

module.exports = {
  OperationsParamsConvertor
};
