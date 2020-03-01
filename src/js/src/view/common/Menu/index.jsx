import React from 'react';
import {NavLink} from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import styles from './styles';

const Menu = props => {
  const {menu, classes} = props;

  const renderTitle = title => (
    <ListItem key={title.name}>
      <Typography variant='body2' fontWeight='semiBold'>
        {title.name.toUpperCase()}
      </Typography>
    </ListItem>
  );

  const renderItems = ({link, name, icon}) => (
    <NavLink
      to={link}
      key={name}
      className={classes.menuLink}
      activeClassName={classes.active}
      exact={link === '/'}
    >
      <ListItem button className={classes.menuItem}>
        <ListItemIcon>
          <Typography variant='h3'>{icon}</Typography>
        </ListItemIcon>
        <Typography variant='body2'>{name}</Typography>
      </ListItem>
    </NavLink>
  );

  const renderMenu = (menuList, index) => (
    <div key={index}>
      {renderTitle(menuList)}
      <List>{menuList.items.map(renderItems)}</List>
    </div>
  );

  return (
    <Drawer classes={{paper: classes.paper}} variant="permanent">
      {menu.map(renderMenu)}
    </Drawer>
  );
};

export default withStyles(styles, {withTheme: true})(Menu);
