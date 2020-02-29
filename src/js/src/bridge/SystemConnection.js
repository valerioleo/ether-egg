import {connect} from 'react-redux';
import {
  pushNotification,
  resetNotification,
  getDefaultAccount
} from '../data/system/systemActions';

export default System => {
  const mapStateToProps = state => ({
    system: state.system
  });

  const mapDispatchToProps = dispatch => ({
    getDefaultAccount: (dispatch)['∘'](getDefaultAccount),
    pushNotification: (dispatch)['∘'](pushNotification),
    resetNotification: (dispatch)['∘'](resetNotification)
  });

  return connect(mapStateToProps, mapDispatchToProps)(System);
};
