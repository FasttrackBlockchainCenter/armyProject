import React, {useEffect,useState} from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
    Grid,
    Button,
    IconButton,
    TextField,
    Link,
    FormHelperText,
    Checkbox,
    Typography,
    Snackbar
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';
import CustomAnimation from './shared/CustomAnimation';
import LogoImg from './../assets/images/falogo.png';


const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor: theme.palette.background.default,
      height: '100%'
    },
    grid: {
      height: '100%'
    },
    leftContainer: {
      [theme.breakpoints.down('md')]: {
        display: 'none'
      },
      bbackground: 'rgb(243,247,250)',
      background: 'linear-gradient(156deg, rgba(243,247,250,1) 0%, rgba(191,193,210,1) 95%, rgba(191,193,210,1) 98%)',
      color : theme.palette.secondary.main,
      textAlign: 'center',
    },
    logo : {
      width: '200px',
      height: 'auto',
      margin: '20% auto 0',
    },
    grid: {
      height: '100%'
    },
    name: {
      marginTop: theme.spacing(3),
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
      paddingRight: theme.spacing(2),
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
    textField: {
      marginTop: theme.spacing(2)
    },
    policy: {
      marginTop: theme.spacing(1),
      display: 'flex',
      alignItems: 'center'
    },
    policyCheckbox: {
      marginLeft: '-14px'
    },
    signUpButton: {
      margin: theme.spacing(2, 0),
    },
    routerLink: {
      '&:hover': {
        textDecoration: 'none',
      },
    }
  }));


const SignUp = props => {
  const [reff, setReff] = useState('');
  useEffect(() => {
    console.log(props.location.search.slice(5))
    setReff(props.location.search.slice(5));
  }, [])

  const {history} = props;

  const [ snackbarOpen, setSnackbarOpen ] = useState(false);
  const [message, setMessage] = useState('');
  
    const classes = useStyles();

    const handleBack = () => {
        history.goBack();
    };

    const handleOpen = () => {
      setSnackbarOpen(true);
    }

    const handleClose = () => {
      setSnackbarOpen(false);
    }
        
    const signupSchema = Yup.object({
        firstName: Yup.string()
        .required('First name is required'),
        lastName: Yup.string()
        .required('Last name is required'),
        email: Yup.string().email()
        .email('Invalid email address')
        .required('Email is required'),
        password: Yup.string()
        .required("No password provided."),
        policy: Yup.boolean()
        .oneOf([true], "You must accept the terms and conditions")
    })

    return(
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
                Join Free Army
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
                  <IconButton onClick={handleBack}>
                      <ArrowBackIcon />
                  </IconButton>
                </div>
                <div className={classes.contentBody}>
                  <Formik
                    initialValues={{ firstName: '', lastName: '', email: '', password: '', policy: false }}
                    validationSchema={ signupSchema }
                    onSubmit={(values, { setSubmitting }) => {
                      if (!values.partner) {
                        values.partner = false
                      }
                      const userObj = {
                        first_name: values.firstName,
                        last_name: values.lastName,
                        email: values.email,
                        password: values.password,
                        partner: values.partner,
                        reff: reff === '' ? '' : reff
                      }
                      axios.post(`${process.env.REACT_APP_API_URL}/api/signup`, userObj)
                        .then((res) => {
                          if (res.data.success) {
                            history.push('/login', { signedUp: true, email: res.data.email });
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
                        <Form className={classes.form} >
                          <Typography
                            className={classes.title}
                            variant="h2"
                          >
                            Create new account
                          </Typography>
                          <Typography
                            color="textSecondary"
                            gutterBottom
                          >
                            Use your email to create new account
                          </Typography>
                          <TextField
                            className={classes.textField}
                            error={errors.firstName && touched.firstName}
                            fullWidth
                            helperText={errors.firstName && touched.firstName && errors.firstName}
                            label="First name"
                            name="firstName"
                            value = {values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            variant="outlined"
                          />
                          <TextField
                            className={classes.textField}
                            error={errors.lastName && touched.lastName}
                            fullWidth
                            helperText={errors.lastName && touched.lastName && errors.lastName}
                            label="Last name"
                            name="lastName"
                            value = {values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            variant="outlined"
                          />
                          <TextField
                            className={classes.textField}
                            error={errors.email && touched.email}
                            fullWidth
                            helperText={errors.email && touched.email && errors.email}
                            label="Email address"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="text"
                            variant="outlined"
                          />
                          <TextField
                            className={classes.textField}
                            error={errors.password && touched.password}
                            fullWidth
                            helperText={errors.password && touched.password && errors.password}
                            label="Password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="password"
                            variant="outlined"
                          />
                          <div className={classes.policy}>
                          <Checkbox
                            className={classes.policyCheckbox}
                            color="primary"
                            name="policy"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <Typography
                            color="textSecondary"
                            variant="body1"
                          >
                            I have read the{' '}
                            <Link
                              color="primary"
                              component={RouterLink}
                              to="#"
                              underline="always"
                              variant="h6"
                            >
                            Terms and Conditions
                            </Link>
                          </Typography>
                          </div>
                          <div className={classes.policy}>
                          <Checkbox
                            className={classes.policyCheckbox}
                            color="primary"
                            name="partner"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <Typography
                            color="textSecondary"
                            variant="body1"
                          >
                            Register as Partner
                          </Typography>
                          </div>
                          {errors.policy && touched.policy && (
                          <FormHelperText error>
                              {errors.policy}
                          </FormHelperText>
                          )}
                          <Grid
                            container
                            direction='row'
                            justify='center'
                            alignItems='center'
                          >
                            <Grid
                              item
                              lg={6}
                              md={5}
                              xs={12}
                            >
                              <Button
                                className={classes.signUpButton}
                                color="primary"
                                disabled={isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                              >
                              Sign up now
                              </Button>
                            </Grid>

                            <Grid
                              item
                              lg
                              md
                              xs
                            >
                              <Typography
                                color="textSecondary"
                                variant="body1"
                                align="center"
                              >
                                or
                              </Typography>
                            </Grid>

                            <Grid
                              item
                              lg={5}
                              md={5}
                              xs={10}
                            >
                              <Link
                                component={RouterLink}
                                to="/login"
                                variant="h6"
                                className={classes.routerLink}
                              >
                                <Button
                                  className={classes.signUpButton}
                                  color="secondary"
                                  fullWidth
                                  size="large"
                                  type="button"
                                  variant="contained"
                                >
                                Sign in
                                </Button>
                              </Link>
                            </Grid>

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
    )
}

SignUp.propTypes = {
    history: PropTypes.object
};

export default withRouter(SignUp);