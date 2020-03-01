import {createMuiTheme} from '@material-ui/core/styles';
import * as eeColors from './eeColors';

const DEFAULT_MUI_THEME = createMuiTheme();

export default {
  palette: {
    ...eeColors,
    text: {
      primary: eeColors.ccDarkGrey,
      secondary: eeColors.ccGreyBlue,
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)'
    },
    background: {
      paper: DEFAULT_MUI_THEME.palette.common.white,
      default: eeColors.ccIceBlue
    }
  }
};
