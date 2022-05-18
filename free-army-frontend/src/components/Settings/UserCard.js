import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import avatar from '../../assets/images/example.jpg';


const useStyles = makeStyles(() => ({
    img: {
        width: '128px',
        height: '128px',
        borderRadius: '50%',
        display: 'inline-block',
        objectFit: 'cover',
    }
  }));


const UserCard = props => {

  const { user } = props;

  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

  const classes = useStyles();

  return(
    <div className='user-card'>
        <div className='img-container'>
            <img className={classes.img} src={avatar} alt='avatar' />
        </div>
        <div className='info-container'>
            <h1>User settings</h1>
            <p>{user.email}</p>
            <p>Joined Free Army on {new Date(user.created_at).toLocaleDateString('default', dateOptions)}</p>
        </div>
    </div>
  )
    

}

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
}

export default UserCard;
