const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 5
  },
  sectionTitle: {
    marginTop: '40px',
    lineHeight: '50px',
    fontSize: theme.spacing.unit * 4,
    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.h3.fontSize,
      marginTop: '60px',
      lineHeight: '64px'
    }
  },
  sectionHeader: {
    marginBottom: theme.spacing.unit * 2
  },
  sectionHeaderText: {
    marginRight: theme.spacing.unit * 8
  },
  labelBox: {
    marginLeft: theme.spacing.unit
  },
  fullWidth: {
    width: '100%'
  }
});

export default styles;
