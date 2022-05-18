import React from 'react';
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
    first_name: Yup.string()
    .required('First name is required'),
    last_name: Yup.string()
    .required('Last name is required'),
    email: Yup.string().email()
    .email('Invalid email address')
    .required('Email is required'),
});

const General = props => {
  const { user, className, ...rest } = props;

  const classes = useStyles();

  return (
    <>
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Formik
          initialValues={{ first_name: user.first_name, last_name: user.last_name, email: user.email }}
          validationSchema={ userSchema }
          onSubmit={(values, { setSubmitting }) => {
            const userObj = {
              first_name: values.first_name,
              last_name: values.last_name,
              email: values.email,
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
                title="Profile"
                subheader="Your personal information"
              />
              <Divider />
              <CardContent>
                <TextField
                  fullWidth
                  label="First name"
                  name="first_name"
                  onChange={handleChange}
                  type="text"
                  value={values.first_name}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Last name"
                  name="last_name"
                  onChange={handleChange}
                  style={{ marginTop: '1rem' }}
                  type="text"
                  value={values.last_name}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  style={{ marginTop: '1rem' }}
                  type="email"
                  value={values.email}
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
  );
};

General.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired,
};

export default General;