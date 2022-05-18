import React, { forwardRef } from 'react';
import { NavLink as RouterLink, withRouter } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, Button, Hidden } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const pages = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <DashboardIcon/>,
  },
  {
    title: 'Progress',
    href: '/progress',
    icon: <TrendingUpIcon/>,
  },
  {
    title: 'Invite Friends',
    href: '/invite-friends',
    icon: <EmojiPeopleIcon/>,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: <SettingsIcon/>,
  }
];

const useStyles = makeStyles(theme => ({
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: theme.palette.navbarText.secondary,
    padding: '10px 18px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium,
    '&:hover': {
      color: theme.palette.navbarText.primary,
      fontWeight: theme.typography.fontWeightMedium,
      background: theme.palette.secondary.dark,
      '& $icon': {
        color: theme.palette.iconActive
      }
    }
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: theme.palette.navbarText.primary,
    fontWeight: theme.typography.fontWeightMedium,
    background: theme.palette.secondary.dark,
    '& $icon': {
      color: theme.palette.iconActive
    }
  }
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

const SidebarMenu = props => {
  const { history, className, ...rest } = props;

  const classes = useStyles();

  const logOut = () => {
    localStorage.removeItem('user');
    history.push('/')
  };

  return (
    <List
      {...rest}
      className={clsx(classes.root, className)}
    >
      {pages.map(page => (
        <ListItem
          className={classes.item}
          disableGutters
          key={page.title}
        >
          <Button
            activeClassName={classes.active}
            className={classes.button}
            component={CustomRouterLink}
            to={page.href}
          >
            <div className={classes.icon}>{page.icon}</div>
            {page.title}
          </Button>
        </ListItem>
      ))}
      <Hidden lgUp>
        <ListItem
          className={classes.item}
          disableGutters
          key='Logout'
        >
          <Button
            activeClassName={classes.active}
            className={classes.button}
            onClick={logOut}
          >
            <div className={classes.icon}>
              <ExitToAppIcon/>
            </div>
              Logout
          </Button>
        </ListItem>
      </Hidden>
    </List>
  );
};

SidebarMenu.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default withRouter(SidebarMenu);