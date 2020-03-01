const styles = theme => ({
  root: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  sectionTitle: {
    marginTop: '40px',
    lineHeight: '50px',
    fontSize: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.h3.fontSize,
      marginTop: '60px',
      lineHeight: '64px'
    }
  },
  sectionHeader: {
    marginBottom: theme.spacing(2)
  },
  sectionHeaderText: {
    marginRight: theme.spacing(8)
  },
  labelBox: {
    marginLeft: theme.spacing()
  },
  fullWidth: {
    width: '100%'
  }
});

export default styles;
