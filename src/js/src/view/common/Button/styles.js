import {percentToHex} from '../../../services/color';

const style = theme => ({
  wrapper: {
    display: 'inline-block',
    marginRight: theme.spacing(),
    marginTop: theme.spacing(),
    marginBottom: theme.spacing(),
    '&:last-of-type': {
      marginRight: 0
    }
  },
  fullWidth: {
    display: 'block',
    width: '100%'
  }
});

export default style;
