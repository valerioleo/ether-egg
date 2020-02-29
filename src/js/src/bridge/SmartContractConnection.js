import {connect} from 'react-redux';
import {
  callMethod,
  getEvents,
  listenForConfirmations
} from '../data/smart-contract/smartContractActions';
import {getDefaultAccountFromState} from '../services/selectors';

export default SmartContractConnection => {
  const mapStateToProps = state => ({
    smartContract: state.smartContract,
    defaultAddress: getDefaultAccountFromState(state)
  });

  const mapDispatchToProps = dispatch => ({
    callMethod: (dispatch)['∘'](callMethod),
    getEvents: (dispatch)['∘'](getEvents),
    listenForConfirmations: (dispatch)['∘'](listenForConfirmations)
  });

  return connect(mapStateToProps, mapDispatchToProps)(SmartContractConnection);
};
