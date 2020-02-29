import React, {useState} from 'react';
import {Field} from 'redux-form';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {useUpdate} from '../../../services/reactHooks';
import AsyncButton from '../AsyncButton';
import FormField from '../Form/FieldRenderer';
import {noop} from '../../../utils/fn';
import {convertSmartContractResultByMethodFactory} from '../../../services/smartContract';
import {toSentenceCase} from '../../../utils/helpers/stringUtils';
import SmartContractOperationFormConnection from '../../../bridge/forms/SmartContractOperationFormConnection';

const renderInputs = (inputs, defaultAccount) => {
  const arrayWarning = type => type.endsWith('[]') ? 'For multiple entries insert comma separated values e.g. "value1,value2,value3"' : null;

  const renderField = (field, index) => {
    const {name, type} = field;

    const optionalFields = ['data', 'operatorData'];

    return (
      <Field
        component={FormField}
        key={index}
        fieldName={toSentenceCase(name)}
        label={arrayWarning(type)}
        type={type}
        name={name}
        proposedValueLabel={type === 'ethereum' && 'Use metamask current address'}
        proposedValue={type === 'ethereum' && defaultAccount}
        helperText={optionalFields.includes(name) && 'This Field is Optional'}
      />
    );
  };

  return inputs
    ? inputs.map(renderField)
    : null;
};

const SmartContractOperationForm = props => {
  const {
    operation,
    onSuccess = noop,
    handleSubmit,
    destroy,
    smartContract,
    defaultAccount,
    disabled = false,
    disabledReason = ''
  } = props;

  const [resultData, setResultData] = useState(undefined);

  const smartContractMethodResult = smartContract.get('callSmartContractMethodResult');
  const asyncResult = smartContractMethodResult.safeGet(operation.name);

  useUpdate(() => {
    asyncResult
      .mapPattern('Success', null, ({data}) => {
        setResultData(data.toJS());
      });
  }, [asyncResult]);

  const handleClose = () => {
    destroy();
    onSuccess();
  };

  const renderResult = ({result}) => {
    const convertResult = convertSmartContractResultByMethodFactory(operation.name);
    return (
      <Paper style={{padding: 5}}>
        <Typography variant='body2' align='center'>
          {String(convertResult(result))}
        </Typography>
      </Paper>
    );
  };

  return (
    <>
      {renderInputs(operation.inputs, defaultAccount)}
      {resultData ? renderResult(resultData) : null}
      <AsyncButton
        onClick={handleSubmit}
        asyncButtonText='Submit'
        asyncResult={smartContractMethodResult.safeGet(operation.name)}
        successMessage='Transaction transmitted successfully.'
        loadingMessage='Executing...'
        onSuccess={operation.stateMutability !== 'view' ? handleClose : noop}
        hideSuccessNotification={operation.stateMutability === 'view'}
        disabled={disabled}
        disabledReason={disabledReason}
      />
    </>
  );
};

export default SmartContractOperationFormConnection(
  SmartContractOperationForm
);
