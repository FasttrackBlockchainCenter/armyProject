import React from 'react';
import {AppBar, Avatar, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import avatar from '../../../assets/images/example.jpg';

const useStyles = makeStyles(theme => ({
    root  : {
        padding: '60px 0',
        marginBottom: '70px',
      '&.user': {
          '& .username, & .email': {
              transition: theme.transitions.create('opacity', {
                  duration: theme.transitions.duration.shortest,
                  easing  : theme.transitions.easing.easeInOut
              })
          }
      }
    },
    avatar: {
        width     : 72,
        height    : 72,
        position  : 'absolute',
        top       : 92,
        padding   : 8,
        background: theme.palette.secondary.main,
        boxSizing : 'content-box',
        left      : '50%',
        transform : 'translateX(-50%)',
        transition: theme.transitions.create('all', {
            duration: theme.transitions.duration.shortest,
            easing  : theme.transitions.easing.easeInOut,
        }),
        '& > img' : {
            borderRadius: '50%'
        }
    }
}));

const Profile = props => {
  const { className, user } = props;
  const classes = useStyles();

  return (
    <AppBar
        position="static"
        color="primary"
        elevation={0}
        classes={{root: classes.root}}
        className="user relative flex flex-col items-center justify-center pt-24 pb-64 mb-32 z-0"
    >
        <Typography className="username text-16 whitespace-no-wrap" color="inherit">{user && user.first_name}</Typography>
        <Typography className="email text-13 mt-8 opacity-50 whitespace-no-wrap" color="inherit">{user && user.bio}</Typography>
         <Avatar
            className={clsx(classes.avatar, "avatar")}
            alt="user photo"
            src={avatar}
        /> 
    </AppBar>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default Profile;