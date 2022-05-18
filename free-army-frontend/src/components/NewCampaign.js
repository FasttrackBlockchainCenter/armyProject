import React, {useEffect,useState} from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
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
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';
import CustomAnimation from './shared/CustomAnimation';
import LogoImg from './../assets/images/falogo.png';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


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
    },
    Calendar: {
      color: 'black'
    }
  }));


const NewCampaign = props => {
  const options = [
    {
      value: 'signup',
      label: 'Sign up',
    },
    {
      value: 'telegram',
      label: 'Join a telegram',
    },
    {
      value: 'follow',
      label: 'Follow on social media',
    },
    {
      value: 'other',
      label: 'Other',
    },
  ];

  const currencyOptions = [
    {
      value: 'usd',
      label: '$',
    },
    {
      value: 'btc',
      label: '₿',
    },
    {
      value: 'eth',
      label: 'ETH',
    }
  ]

  const durationOptions = [
    {
      value: 'time',
      label: 'Time - Stop at x months, days, date',
    },
    {
      value: 'recurring',
      label: 'Recurring - Only stops when you stop it',
    },
    {
      value: 'budget',
      label: 'Budget - Stop campaign after X amount is spent',
    }
  ];

  const targetOptions = [
    {
      value: 'individuals',
      label: 'Individuals',
    },
    {
      value: 'businesses',
      label: 'Businesses',
    },
    {
      value: 'everybody',
      label: 'Everybody',
    }
  ];

  const websiteOptions = [
    {
      value: 'yes',
      label: 'Yes - provide a url',
    },
    {
      value: 'no',
      label: 'No - I would like you to make me one, just an option',
    },
    {
      value: 'other',
      label: 'Other - Your variant',
    }
  ]

  // let [currency, setCurrency] = useState('');
  let [duration, setDuration] = useState('');
  let [target, setTarget] = useState('');
  let [conversation, setConversation] = useState('');
  let [fullBudget, setFullBudget] = useState('');
  let [eachBudget, setEachBudget] = useState('');
  let [purpose, setPurpose] = useState('');
  let [variant, setVariant] = useState('');
  let [conversationWay, setConversationWay] = useState('');
  let [website, setWebsite] = useState('');
  let [websiteOther, setWebsiteOther] = useState('');
  let [providedURL, setProvidedURL] = useState('');
  let [value, onChange] = useState(new Date());
  
  const [reff, setReff] = useState('');
  useEffect(() => {
    console.log(props.location.search.slice(5))
    setReff(props.location.search.slice(5));
  }, [])

  const { history } = props;
  let user = JSON.parse(localStorage.getItem('user'));
  const [selectedDate, setSelectedDate] = React.useState(new Date().now);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

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

    const handleConversationType = (event) => {
      setConversation(event.target.value);
    };

    const handleTarget = (event) => {
      setTarget(event.target.value);
    };

    const handleDuration = (event) => {
      setDuration(event.target.value);
    };

    const handleEachBudget = (event) => {
      setEachBudget(event.target.value);
    };

    const handleFullBudget = (event) => {
      setFullBudget(event.target.value);
    };

    const handlePurpose = (event) => {
      setPurpose(event.target.value);
    };

    const handleVariant = (event) => {
      setVariant(event.target.value);
    };

    const handleConversationWay = (event) => {
      setConversationWay(event.target.value);
    };

    const handleWebsite = (event) => {
      setWebsite(event.target.value);
    };

    const handleWebsiteOther = (event) => {
      setWebsiteOther(event.target.value);
    };

    const handleProvidedURL = (event) => {
      setProvidedURL(event.target.value);
    };
    
        
    // const createSchema = Yup.object({
    //     title: Yup.string()
    //     .required('Title is required'),
    //     desc: Yup.string()
    //     .required('Description is required')
    // })

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
                    onSubmit={(values, { setSubmitting }) => {
                      if (!values.partner) {
                        values.partner = false
                      }
                      const userObj = {
                        duration,
                        selectedDate,
                        fullBudget,
                        purpose,
                        eachBudget,
                        conversation,
                        variant,
                        target,
                        website,
                        conversationWay,
                        websiteOther,
                        providedURL
                      }
                      console.log(userObj)
                      axios.post(`${process.env.REACT_APP_API_URL}/api/create_campaign`, userObj)
                        .then((res) => {
                          if (res.data.success) {
                            history.push('/dashboard');
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
                            Create new Campaign
                          </Typography>
                          <Typography
                            color="textSecondary"
                            gutterBottom
                          >
                            Enter new camapign details
                          </Typography>
                          <TextField
                            className={classes.textField}
                            label="Campaign Duration"
                            name="conversation-type"
                            id="outlined-select-currency"
                            fullWidth
                            select
                            value={duration}
                            onBlur={handleBlur}
                            onChange={handleDuration}
                            variant="outlined"
                          >
                            {durationOptions.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                          {(duration == 'time')? 
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              // inputProps={{ min: "01/24/2019", max: "05/31/2022" }}
                              variant="inline"
                              format="MM/dd/yyyy"
                              margin="normal"
                              fullWidth
                              id="date-picker-inline"
                              label="Date picker inline"
                              value={selectedDate}
                              onChange={handleDateChange}
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                            />
                            </MuiPickersUtilsProvider>
                            :null
                          }
                          {(duration == 'budget')?
                            <TextField
                            className={classes.textField}
                            error={errors.website && touched.website}
                            fullWidth
                            helperText={errors.website && touched.website && errors.website}
                            label="Amount of money"
                            name="budget"
                            value={fullBudget}
                            onChange={handleFullBudget}
                            onBlur={handleBlur}
                            type="number"
                            variant="outlined"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                          />
                          :null
                          }
                          
                          <TextField
                            className={classes.textField}
                            error={errors.desc && touched.desc}
                            fullWidth
                            helperText={errors.desc && touched.desc && errors.desc}
                            label="Purpose - What is the objective / purpose of the campaign "
                            name="desc"
                            value = {purpose}
                            onChange={handlePurpose}
                            onBlur={handleBlur}
                            type="text"
                            variant="outlined"
                            multiline
                            rows={3}
                          />
                          <div>
                          <TextField
                            className={classes.textField}
                            error={errors.website && touched.website}
                            fullWidth
                            helperText={errors.website && touched.website && errors.website}
                            label="Budget for each conversation ($)"
                            name="conversationBudget"
                            value={eachBudget}
                            onChange={handleEachBudget}
                            onBlur={handleBlur}
                            type="number"
                            variant="outlined"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                          />
                          </div>
                          <TextField
                            className={classes.textField}
                            label="What does a conversion look like? "
                            name="conversation-type"
                            id="outlined-select-currency"
                            fullWidth
                            select
                            value={conversation}
                            onBlur={handleBlur}
                            onChange={handleConversationType}
                            variant="outlined"
                          >
                            {options.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                          { (conversation == 'other') ? <TextField
                          className={classes.textField}
                          error={errors.website && touched.website}
                          fullWidth
                          helperText={errors.website && touched.website && errors.website}
                          label="Your variant"
                          name="custom-option"
                          value={variant}
                          onChange={handleVariant}
                          onBlur={handleBlur}
                          type="text"
                          variant="outlined"
                        /> : null }

                          <TextField
                            className={classes.textField}
                            label="Target - Who are you looking to target with this campaign"
                            name="target"
                            id="outlined-select-currency"
                            fullWidth
                            select
                            value={target}
                            onBlur={handleBlur}
                            onChange={handleTarget}
                            variant="outlined"
                          >
                            {targetOptions.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                          
                          <TextField
                            className={classes.textField}
                            label="Website URL"
                            name="websiteOption"
                            id="outlined-select-currency"
                            fullWidth
                            select
                            value={website}
                            onBlur={handleBlur}
                            onChange={handleWebsite}
                            variant="outlined"
                          >
                            {websiteOptions.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>

                          {
                            (website == 'yes') ?
                            <TextField
                              className={classes.textField}
                              error={errors.website && touched.website}
                              fullWidth
                              helperText={errors.website && touched.website && errors.website}
                              label="Website"
                              name="website"
                              value={providedURL}
                              onChange={handleProvidedURL}
                              onBlur={handleBlur}
                              type="text"
                              variant="outlined"
                            />: null
                          }
                          {
                            (website == 'other') ?
                            <TextField
                            className={classes.textField}
                            error={errors.desc && touched.desc}
                            fullWidth
                            helperText={errors.desc && touched.desc && errors.desc}
                            label="Your variant"
                            name="websiteOther"
                            value = {websiteOther}
                            onChange={handleWebsiteOther}
                            onBlur={handleBlur}
                            type="text"
                            variant="outlined"
                            multiline
                            rows={3}
                          />: null
                          }

                          <TextField
                            className={classes.textField}
                            error={errors.website && touched.website}
                            fullWidth
                            helperText={errors.website && touched.website && errors.website}
                            label="What constitutes a conversion"
                            multiline
                            rows={5}
                            name="conversationWay"
                            placeholder='How will we know that our user should get a reward or they have completed your campaign?'
                            value={conversationWay}
                            onChange={handleConversationWay}
                            onBlur={handleBlur}
                            type="text"
                            variant="outlined"
                          />   

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

                              <Button
                                className={classes.signUpButton}
                                color="primary"
                                disabled={isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                              >
                              Create
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
    )
}

NewCampaign.propTypes = {
    history: PropTypes.object
};

export default withRouter(NewCampaign);
