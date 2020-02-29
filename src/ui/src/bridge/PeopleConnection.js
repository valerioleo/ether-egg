import {connect} from 'react-redux';
import {loadPeople} from '../data/people/peopleActions';

export default People => {
  const mapStateToProps = state => ({
    people: state.people
  });

  const mapDispatchToProps = dispatch => ({
    loadPeople: (dispatch)['∘'](loadPeople)
  });

  return connect(mapStateToProps, mapDispatchToProps)(People);
};
