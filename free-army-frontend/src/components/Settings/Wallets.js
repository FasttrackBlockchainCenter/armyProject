
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField
} from '@material-ui/core';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import axios from 'axios';

const useStyles = makeStyles(() => ({
    root: {
      borderRadius: '8px',
      boxShadow: '0 2px 4px 0 rgba(14,30,37,.12)',
    }
  }));

const userSchema = Yup.object({
    bitcoin_wallet_pub: Yup.string()
    .required('First name is required'),
    ethereum_wallet_pub: Yup.string()
    .required('Last name is required'),
});

const Wallets = props => {
    const { user, className, ...rest } = props;
  
    const classes = useStyles();
  
    const formSubmit = event => {
    }

    return(
        <>
        <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Formik
          initialValues={{ ethereum_wallet_pub: user.ethereum_wallet_pub, bitcoin_wallet_pub: user.bitcoin_wallet_pub }}
          validationSchema={ userSchema }
          onSubmit={(values, { setSubmitting }) => {
            const userObj = {
              ethereum_wallet_pub: values.ethereum_wallet_pub,
              bitcoin_wallet_pub: values.bitcoin_wallet_pub,
              id: user.id,
            }
            axios.post(`${process.env.REACT_APP_API_URL}/api/update_settings`, userObj)
              .then((res) => {
                  setSubmitting(false)
                if (res.data.success) {
                  alert('updated')
                  localStorage.setItem('user', JSON.stringify(res.data.data))
                  
                } else {
                  alert('Error while saving')
                }
              }).catch((error) => {
                  console.log(error)
              });
          }}
        >
          {({ 
            values, 
            touched, 
            errors, 
            handleChange, 
            handleBlur,
            isSubmitting 
          }) => ( 
            <Form>
              <CardHeader
                title="Crypto Wallets"
                subheader="Your registered crypto wallets for payouts"
              />
              <Divider />
              <CardContent>
                <TextField
                  fullWidth
                  label="₿ Bitcoin Wallet Address"
                  name="bitcoin_wallet_pub"
                  onChange={handleChange}
                  type="text"
                  value={values.bitcoin_wallet_pub}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Ethereum Wallet Address"
                  name="ethereum_wallet_pub"
                  onChange={handleChange}
                  style={{ marginTop: '1rem' }}
                  type="text"
                  value={values.ethereum_wallet_pub}
                  variant="outlined"
                />
              </CardContent>
              <Divider />
              <CardActions>
                <Button
                  color="primary"
                  variant="outlined"
                  disabled={isSubmitting}
                  type="submit"
                >
                  Update
                </Button>
              </CardActions>
            </Form>
          )}
        </Formik>
      </Card>
        
        
        
        
        </>
    )

    };

    export default Wallets;