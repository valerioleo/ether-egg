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
  },
  primary: {
    backgroundColor: theme.palette.ccWaterBlue,
    '&:hover': {
      backgroundColor: theme.palette.ccNiceBlue
    },
    '&:active': {
      backgroundColor: theme.palette.ccCobalt
    }
  },
  primaryLight: {
    backgroundColor: theme.palette.primary.light,
    border: `1px solid ${theme.palette.primary.main}`,
    '&:hover': {
      backgroundColor: theme.palette.primary.main + percentToHex(27)
    },
    '&:active': {
      backgroundColor: theme.palette.ccCobalt
    }
  },
  secondary: {
    backgroundColor: theme.palette.ccPaleLilac,
    color: theme.palette.text.primary,
    '&:hover': {
      backgroundColor: theme.palette.ccLightPeriWinkle
    },
    '&:active': {
      backgroundColor: theme.palette.ccLightBlueGrey
    }
  },
  noMargin: {
    marginTop: 0,
    marginBottom: 0
  },
  destructive: {
    backgroundColor: theme.palette.ccReddishOrange,
    '&:hover': {
      backgroundColor: theme.palette.ccTerraCotta
    },
    '&:active': {
      backgroundColor: theme.palette.ccCopper
    }
  },
  disabled: {
    opacity: 0.4,
    color: 'white !important'
  }
});

export default style;
