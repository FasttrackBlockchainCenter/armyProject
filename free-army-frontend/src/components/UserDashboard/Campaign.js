import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import BottomBar from './BottomBar';
import SuccessPage from '../SuccessPage';
import axios from 'axios';
import './Campaign.css';

const useStyles = makeStyles(theme => ({
    root: {
      position: 'relative'
    },
    content: {
      alignItems: 'center',
      display: 'flex'
    },
    title: {
      fontWeight: 700,
      color: '#fff',
    },
    avatar: {
      backgroundColor: theme.palette.success.main,
      height: 56,
      width: 56
    },
    icon: {
      height: 32,
      width: 32
    },
    difference: {
      marginTop: theme.spacing(2),
      display: 'flex',
      alignItems: 'center'
    },
    differenceIcon: {
      color: theme.palette.success.dark
    },
    differenceValue: {
      color: theme.palette.success.dark,
      marginRight: theme.spacing(1)
    },
    campaign: {
      minHeight: '400px',
      margin: theme.spacing(4),
      position: 'relative',
    },
    info: {
      padding: '10px',
      color: '#000',
    },
    list: {
      width: '100%',
      maxWidth: 360,
    },
    inline: {
      display: 'inline',
    },
  }));


const Campaign = props => {
    
    const { className, user, campaigns, camp_id, ...rest } = props;
    let current = props.campaigns.find(a => a.id == props.camp_id);
    let active = props.campaigns.indexOf(current);
    const [ content, loadContent ] = useState('');
    const [ completed, setCompleted ] = useState(false);
    const [ activeCampaign, setActiveCampaign ] = useState(props.campaigns[active]);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    useEffect(() => {

      if (activeCampaign.id == 1) {

        fetch('https://cors-anywhere.herokuapp.com/'+activeCampaign.website)
        .then(resp => {

          resp.blob().then(re => {
            var FR = new FileReader();
            FR.onload = event => {

              // change the links for 2 buttons
              let changedContent = new DOMParser().parseFromString(FR.result, 'text/html');
              let downloadBtn1 = changedContent.getElementById('button-download1').getElementsByClassName('show');
              downloadBtn1[0].href = 'https://laptop-updates.brave.com/download/FRE413';

              let downloadBtn2 = changedContent.getElementById('button-download2').getElementsByClassName('show');
              downloadBtn2[0].href = 'https://laptop-updates.brave.com/download/FRE413';

              changedContent = new XMLSerializer().serializeToString(changedContent);
              loadContent('<link rel="stylesheet" href="https://brave.com/wp-content/uploads/files_2019-11-home/css/styles.min.css" />'+ changedContent);
              
              // complete campaign on button click
              let _iframe = document.getElementById("third-party");
              if (_iframe) {
                _iframe.contentWindow.addEventListener( 'click', function(e) {
                  if (e.target && e.target.matches("a.show")) {
                    handleClickOpen();
                    setCompleted(true);

                    let data = {
                      user_id: props.user.id,
                      campaign_id: activeCampaign.id,
                    }

                    console.log(data)

                    axios.post(`${process.env.REACT_APP_API_URL}/api/complete_campaign`, data)
                    .then((res) => {
                        console.log(res)
                    }).catch((error) => {
                      console.log(error)
                    });


                  }
                });
              }

            };
            FR.readAsText(re);
          });
        })
        .catch(err => {
          console.log(err);
        });
      } else {
        doCORSRequest({
            method: 'get',
            url: activeCampaign.website,
          }, function printResult(result) {
            loadContent(result);
          });
      }
    }, []);

     var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
      function doCORSRequest(options, printResult) {
        var x = new XMLHttpRequest();
        x.open(options.method, cors_api_url + options.url);
        x.onload = x.onerror = function() {
          printResult(
            options.method + ' ' + options.url + '\n' +
            x.status + ' ' + x.statusText + '\n\n' +
            (x.responseText || '')
          );
          console.log(x.responseText)
        };
        if (/^POST/i.test(options.method)) {
          x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        x.send(options.data);
      }

    const nextCampaign = () => {
      setCompleted(false)
      if (active < props.campaigns.length-1)
      ++active
      setActiveCampaign(props.campaigns[active])
    };

    const downloadHandler = () => {
      setOpen(true);
      setCompleted(true)
    }
  
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          < SuccessPage />
        </Dialog>
        <Grid 
          item
          container
          justify='center'
        >
          <Grid
            item
            xl={4}
            lg={4}
            md={12}
            sm={12}
            xs={12}
          > 
            <div className={classes.info}>
              <Typography
                gutterBottom
                variant="h2"
              >
                {activeCampaign.title}
              </Typography>
              <Typography
                gutterBottom
                variant="body1"
              >
                {activeCampaign.description}
              </Typography>
            </div>       
          </Grid>
          <Grid
            item
            xl={8}
            lg={8}
            md={12}
            sm={12}
            xs={12}
            className='browser-frame-wrapper'
          >

          <div className='browser-frame'>
            <div className='browser-header'>
              <i className='window-control'></i>
              <i className='window-control'></i>
              <i className='window-control'></i>
              <div className='frame-link'>
                <div>
                  <span>{ activeCampaign.website }</span>
                </div>
              </div>
            </div>
            <div className='browser-body'>
              {
                (activeCampaign.id )
                  ? <iframe id='third-party' srcDoc={content} style={{width: '100%', height: '100%' }}></iframe>
                  : <iframe id='third-party' src = {'https://cors-anywhere.herokuapp.com/'+activeCampaign.website} style={{width: '100%', height: '100%' }}></iframe>
              
              }   
            </div>
          </div>          
          </Grid>
        </Grid>
        <BottomBar
          completed={completed}
          nextCampaign={nextCampaign}
          campaigns={props.campaigns}
        />
      </div>
    );
  };
  
  Campaign.propTypes = {
    className: PropTypes.string,
    user: PropTypes.object.isRequired,
    campaigns: PropTypes.array.isRequired,
  };
  
  export default Campaign;