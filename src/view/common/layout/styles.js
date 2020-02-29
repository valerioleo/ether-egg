const styles = theme => ({
  navigationPosition: {
    top: '58px',
    left: 'calc(50vw - 1350px / 2)',
    width: 'auto',
    position: 'fixed',
    [theme.breakpoints.down('1410')]: {
      left: '20px'
    }
  },
  iconRotate: {
    transform: 'rotate(0deg) !important'
  },
  iconTransition: {
    transition: theme.transitions.create('transform', {duration: 300})
  },
  icon: {
    transform: 'rotate(180deg)',
    marginLeft: '15px'
  },
  contentPosition: {
    paddingTop: '150px',
    maxWidth: '1108px',
    width: 'calc(100vw - 278px - 24px + 16px)',
    paddingLeft: 'calc((50vw - 1390px / 2 + 278px) - 4px)',
    [theme.breakpoints.down('1410')]: {
      paddingLeft: '278px'
    }
  },
  dropdownToggle: {
    display: 'inline-flex',
    cursor: 'pointer'
  }
});

export default styles;
