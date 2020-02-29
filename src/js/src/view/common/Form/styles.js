export default theme => ({
  fieldName: {
    marginBottom: '14px',
    letterSpacing: '0.2px'
  },
  crypto: {
    fontFamily: 'SourceCodePro Mono'
  },
  inputRoot: {
    borderRadius: '2px',
    border: `1px solid ${theme.palette.grey[400]}`,
    padding: `10px ${theme.spacing.unit * 2}px`,
    '&:hover': {
      boxShadow: theme.palette.hoverShadow,
      borderColor: theme.palette.common.black
    },
    minHeight: theme.spacing.unit * 7,
    boxSizing: 'border-box',
    background: theme.palette.common.white
  },
  inputAdornment: {
    minHeight: '30px',
    height: '100%'
  },
  inputRootFocused: {
    borderColor: theme.palette.primary.main
  },
  inputRootError: {
    borderColor: theme.palette.error.main
  },
  errorLabel: {
    color: theme.palette.error.main
  }
});
