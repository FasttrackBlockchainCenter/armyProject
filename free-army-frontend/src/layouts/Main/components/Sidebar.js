import React from 'react';
import clsx from 'clsx';
import { AppBar, Hidden, Icon, Drawer } from '@material-ui/core';
import Profile from './Profile';
import SidebarMenu from './SidebarMenu';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
    content: {
        overflowX                   : 'hidden',
        overflowY                   : 'auto',
        '-webkit-overflow-scrolling': 'touch',
        background                  : 'linear-gradient(rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 30%), linear-gradient(rgba(0, 0, 0, 0.25) 0, rgba(0, 0, 0, 0) 40%)',
        backgroundRepeat            : 'no-repeat',
        backgroundSize              : '100% 40px, 100% 10px',
        backgroundAttachment        : 'local, scroll'
    },
    navbarContent  : {
        flex: '1 1 auto',
    },
    drawer: {
        background: theme.palette.secondary.main,
        width: 240,
        [theme.breakpoints.up('lg')]: {
          marginTop: 64,
          height: 'calc(100% - 64px)'
        }
    },
}));

const Sidebar = props => {
  const { user, open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();


  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
        <div className={clsx("flex flex-col overflow-hidden h-full", props.className)}>
            <div>
                <Profile
                    user = {user}
                />

                <SidebarMenu 
                  className={classes.nav} 
                  user={user}
                />

            </div>
        </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

export default Sidebar;