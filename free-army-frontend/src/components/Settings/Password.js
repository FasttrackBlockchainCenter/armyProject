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
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: '8px',
    boxShadow: '0 2px 4px 0 rgba(14,30,37,.12)',
  },
}));

const passSchema = Yup.object({
    old_password: Yup.string()
    .required('Required field'),
    new_password: Yup.string()
    .required("Required field"),
});

const Password = props => {
  const { user, className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
        <Formik
          initialValues={{ old_password: '', new_password: '' }}
          validationSchema={ passSchema }
          onSubmit={(values, { setSubmitting }) => {
            const passObj = {
              old_password: values.old_password,
              new_password: values.new_password,
              user_email: user.email,
            }
            console.log(passObj)
            axios.post(`${process.env.REACT_APP_API_URL}/api/change_password`, passObj)
              .then((res) => {
                  setSubmitting(false)
                if (res.data.success) {
                  alert('updated')
                } else {
                  alert(res.data.message)
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
                subheader="Update password"
                title="Password"
                />
                <Divider />
                <CardContent>
                <TextField
                    fullWidth
                    label="Old password"
                    name="old_password"
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    label="New password"
                    name="new_password"
                    onChange={handleChange}
                    style={{ marginTop: '1rem' }}
                    type="password"
                    value={values.confirm}
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
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;