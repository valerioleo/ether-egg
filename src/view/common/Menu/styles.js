const styles = theme => ({
  paper: {
    background: 'none',
    border: 'none',
    position: 'unset',
    marginTop: '50px'
  },
  menuLink: {
    color: theme.palette.text.primary,
    textDecoration: 'none'
  },
  menuItem: {
    color: 'inherit',
    background: 'none !important',
    '&:hover': {
      color: theme.palette.ccSoftBlue
    }
  },
  active: {
    color: theme.palette.primary.main
  },
  focus: {
    background: 'green'
  },
  menuIcon: {
    height: '20.5px',
    width: '20.5px'
  }
});

export default styles;
