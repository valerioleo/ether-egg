import {percentToHex} from '../../../services/color';

const style = theme => ({
  wrapper: {
    display: 'inline-block',
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
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
