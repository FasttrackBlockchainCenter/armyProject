import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Fade, Grid } from '@material-ui/core';
import UserCard from './UserCard';
import Password from './Password';
import General from './General';
import Wallets from './Wallets';
import { default as ConnectButton } from '../web3/ConnectButton';
import './Settings.css';
import axios from 'axios';


const useStyles = makeStyles(() => ({
  root: {
    marginTop: '20px',
    maxWidth: '100%',
    margin: '0 auto',
  }
}));

const Settings = props => {
  let state = null;
  let fileSelectedHandler = event => {
    state = event.target.files[0]
    // const data = new FormData();
    // data.append('file', event.target.files[0]);

    // axios.post(`${process.env.REACT_APP_API_URL}/api/change_image`, data)
    //   .then((res) => {
    //     console.log(res)
    //   });
  }

  let fileUploadHandler = () => {

    console.log(state)
    const fd = new FormData();
    let currentId = JSON.parse(localStorage.getItem('user')).id;

    fd.append('file', state);
    fd.append('id', currentId);

    for (var pair of fd.values()) {
      console.log(pair); 
    }


    axios.post(`${process.env.REACT_APP_API_URL}/api/change_image`, fd)
      .then((res) => {
        if (res.data.success) {
          alert('Image Updated')
        } else {
          alert(res.data.message)
        }
      }).catch((error) => {
          console.log(error)
      });
  };

    

  const user = JSON.parse(localStorage.getItem('user'));
  const { className } = props;

  const classes = useStyles();

  return (
    <>
      <Grid
          container
          spacing={4}
          className={classes.root}
      >
        <Grid
            item
            md={7}
            xs={12}
          >
            < UserCard user={user} />
            <input name='file' style={{display: 'inline'}} accept="image/.png" multiple={false} type="file" onChange={fileSelectedHandler}/>

            <button style={{color: 'black'}} onClick={fileUploadHandler}>Upload</button>
        </Grid>
        <Grid
            item
            md={5}
            xs={12}
          >
            <ConnectButton />
        </Grid>
      </Grid>

      <Grid
        container
        spacing={4}
        className={classes.root}
      >
        <Grid
          item
          md={7}
          xs={12}
        >
          <General user={user} />
        </Grid>
        <Grid
          item
          md={5}
          xs={12}
        >
          <Password user={user} />
        </Grid>
        <Grid
          item
          md={5}
          xs={12}
        >
          <Wallets user={user} />
        </Grid>
      </Grid>
    </>
  );
};

Settings.propTypes = {
  className: PropTypes.string
};

export default Settings;