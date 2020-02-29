import {connect} from 'react-redux';
import {reduxForm, initialize} from 'redux-form';
import {
  required,
  validateEthereum,
  number,
  unsignedNumber
} from '../../services/form';
import {OperationsParamsConvertor} from '../../utils/eth-utils/contracts/SmartContractOperations';
import {callMethod, resetAction} from '../../data/smart-contract/smartContractActions';
import {noop} from '../../utils/fn';

const validateType = (value = '', inputType) => {
  const isNumber = inputType.includes('int');
  const isUnsignedNumber = inputType.includes('uint');
  const isArray = inputType.endsWith('[]');

  if(isArray) {
    const array = value.split(',');
    const err = array.map(val => validateType(val, inputType.slice(0, -2)));
    return err.find(Boolean);
  }

  const type = isNumber ? 'number' : inputType;

  switch(type) {
    case 'address': { return validateEthereum(value); }
    case 'number': {
      if(isUnsignedNumber) {
        return unsignedNumber(value);
      }

      return number(value);
    }
    default: return undefined;
  }
};

const validate = (values, {operation = {}, customValidators = {}}) => {
  const errors = {};
  const {inputs, name: operationName} = operation;
  const customValidator = customValidators[operationName] || noop;

  if(inputs) {
    inputs.forEach(input => {
      errors[input.name] = required(values[input.name]);
      errors[input.name] = validateType(values[input.name], input.type);
    });
  }

  return {...errors, ...customValidator(values, inputs)};
};

const getParams = (values, operation) => {
  const {
    name,
    inputs,
    contractInterface
  } = operation;

  const convertor = OperationsParamsConvertor[contractInterface];
  const method = convertor ? convertor[name] : null;

  const params = inputs.map(i => {
    if(i.type.endsWith('[]')) {
      return values[i.name].split(',');
    }

    return values[i.name];
  });

  const finalParams = method ? method({...values}) : params;

  return finalParams;
};

export default SmartContractOperation => {
  const mapStateToProps = state => ({
    formData: state.form,
    smartContract: state.smartContract
    // defaultAccount: getDefaultAccountFromState(state)
  });

  const mapDispatchToProps = dispatch => ({
    resetAction: (dispatch)['∘'](resetAction),
    setInitialValues: (...args) => dispatch(initialize(...args))
  });

  const Form = reduxForm({
    form: 'SmartContractOperation',
    validate,
    initialValues: {data: ''},
    onSubmit: (values, dispatch, {contractInterface, contractAddress, operation}) => {
      const {name: method} = operation;
      const args = getParams(values, operation);

      const callMethodData = {
        contractInterface,
        method,
        contractAddress,
        args
      };

      dispatch(callMethod(callMethodData));
    }
  })(SmartContractOperation);

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Form);
};
