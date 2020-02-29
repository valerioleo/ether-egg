
import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';

const CustomLink = props => {
  const {
    internal,
    children,
    to,
    underline = 'none',
    color,
    ...restProps
  } = props;

  const MyLink = routerProps => <RouterLink to={to} {...routerProps} />;

  return (
    <Link style={{cursor: 'pointer', color}} underline={underline} component={internal && MyLink} href={to} {...restProps}>
      {children}
    </Link>
  );
};

export default CustomLink;
