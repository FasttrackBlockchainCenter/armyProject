import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Formik, Form } from 'formik';
// import './login.css'
import * as Yup from 'yup';
import {
    Grid,
    Button,
    IconButton,
    TextField,
    Link,
    Typography,
    Snackbar
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';
import CustomAnimation from './shared/CustomAnimation';
import LogoImg from './../assets/images/falogo.png';
import queryString from 'query-string';


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  leftContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
    background: 'rgb(243,247,250)',
    background: 'linear-gradient(156deg, rgba(243,247,250,1) 0%, rgba(191,193,210,1) 95%, rgba(191,193,210,1) 98%)',
    color : theme.palette.secondary.main,
    textAlign: 'center',
  },
  logo : {
    width: '200px',
    height: 'auto',
    margin: '153px auto 0',
  },
  grid: {
    height: '100%'
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'hidden',
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3),
    color: '#0059b3',
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0),
  },
  routerLink: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
  reset: {
    marginTop: '10px',
    display: 'block',
  }
}));


const SetNewPassword = props => {

    const { history } = props;
    const queryData = queryString.parse(props.location.search);

    const classes = useStyles();
    const [ snackbarOpen, setSnackbarOpen ] = useState(false);
    const [message, setMessage] = useState('');

    const locationData = props.location.state;

    useEffect(() => {
      if (locationData && locationData.verified) {
        setMessage('Your account has been verified');
        handleOpen();
      }
      else if (locationData && locationData.signedUp) {
        setMessage(`The verification email has been sent to ${locationData.email}`);
        handleOpen();
      }
    }, []);

    const handleOpen = () => {
      setSnackbarOpen(true);
    }

    const handleClose = () => {
      setSnackbarOpen(false);
    }

    const passwordSchema = Yup.object({
        password: Yup.string()
        .required("No password provided."),
        passwordConfirm: Yup.string()
         .oneOf([Yup.ref('password'), null], "Passwords must match")
         .required('Password confirm is required')
    })

    return (
      <div className={classes.root}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={snackbarOpen}
          onClose={handleClose}
          message={message}
        />
        <Grid
          className={classes.grid}
          container
        >
          <Grid
            className={classes.leftContainer}
            item
            lg={5}
          >
           <CustomAnimation animation="transition.slideUpIn" delay={200}>
             <img src={LogoImg} alt="logo" className={classes.logo} />
           </CustomAnimation>

          <CustomAnimation animation="transition.slideUpIn" delay={200}>
            <Typography variant="h3" color="inherit" className="font-light">
                Welcome back!<br/>
                Log in to access current campaigns.
            </Typography>
          </CustomAnimation>

          </Grid>

          <Grid
            className={classes.content}
            item
            lg={7}
            xs={12}
          >
            <CustomAnimation animation={{translateX: [0, '100%']}}>
              <div className={classes.content}>
                <div className={classes.contentHeader}>
                </div>
                <div className={classes.contentBody}>

                <Formik
                  initialValues={{ password: '', passwordConfirm: '' }}
                  validationSchema={ passwordSchema }
                  onSubmit={(values, { setSubmitting }) => {
                    const userObj = {
                      password: values.password,
                      email: queryData.email,
                      reset_token: queryData.token
                    }
                    axios.post(`${process.env.REACT_APP_API_URL}/api/reset_password`, userObj)
                      .then((res) => {
                          setSubmitting(false)
                        if (res.data.success) {
                            history.push('/login', { passwordChanged: true });
                        } else {
                          setMessage(res.data.message);
                          handleOpen();
                        }
                      }).catch((error) => {
                          console.log(error);
                          setMessage('Something went wrong');
                          handleOpen();
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
                    <Form
                      className={classes.form}
                    >
                      <Typography
                        className={classes.title}
                        variant="h2"
                      >
                        Set new password
                      </Typography>
                      
                      <TextField
                        className={classes.textField}
                        error={errors.password && touched.password}
                        fullWidth
                        helperText={errors.password && touched.password && errors.password}
                        label="New password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="password"
                        variant="outlined"
                      />
                      <TextField
                        className={classes.textField}
                        error={errors.passwordConfirm && touched.passwordConfirm}
                        fullWidth
                        helperText={errors.passwordConfirm && touched.passwordConfirm && errors.passwordConfirm}
                        label="Confirm password"
                        name="passwordConfirm"
                        value={values.passwordConfirm}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type="password"
                        variant="outlined"
                      />

                        <Grid
                          item
                          lg={6}
                          md={5}
                          xs={12}
                        >
                          <Button
                            className={classes.signInButton}
                            color="primary"
                            disabled={isSubmitting}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                          >
                            Submit
                          </Button>
                        </Grid>

                    </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </CustomAnimation>
          </Grid>

        </Grid>
      </div>
    );
}

export default withRouter(SetNewPassword);