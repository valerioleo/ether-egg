import {BN} from '../core/utils';

const EtherEggConvertor = {
  generateId: ({_solution}) => [_solution],
  layEgg: value => [new BN(value.egg_id)]
};

const OperationsParamsConvertor = {
  EtherEgg: EtherEggConvertor
};

module.exports = {
  OperationsParamsConvertor
};
