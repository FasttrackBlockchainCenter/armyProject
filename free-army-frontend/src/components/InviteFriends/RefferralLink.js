import React, { useRef, useState } from 'react'; 
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import FileCopyIcon from '@material-ui/icons/FileCopy'; 
import Divider from '@material-ui/core/Divider';   
    
    
    
const useStyles = makeStyles(() => ({
    img: {
        width: '128px',
        height: '128px',
        borderRadius: '50%',
        display: 'inline-block',
        objectFit: 'cover',
    },
    userReferralLinkField: {
        width: '85%',
        textAlign: "center",
        float: "left",
        padding: "1rem"     
    },
    inputLink: {
        fontSize: "12px"
    },
    fileCopyIcon: {
        padding: '',
        marginTop: '1rem'
    },
    referralDivider: {
        height: '2px',
        backgroundColor: 'white',
        margin: '1em 1em 1em 1em'
    },
    referralLinkCTA: {
        fontWeight: 'bold',
        paddingTop: '1em'
    }

  }));


const ReferralLink = props => {

  const { user, ...rest } = props;

  const classes = useStyles();

  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);
  const userReferralLink = user.referral_link;

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopySuccess('Copied!');
  };

  return (
<div>
    <h3 className={classes.referralLinkCTA}>Click to Copy Your Link!</h3>
<TextField className={classes.userReferralLinkField} 
  value={userReferralLink}     
  InputProps={{
  className: classes.inputLink,
  }}
  inputRef={textAreaRef}
  value={userReferralLink}
/>
<FileCopyIcon className={classes.fileCopyIcon} onClick={copyToClipboard}/>
<Divider orientation='horizontal' variant='middle' light={true} className={classes.referralDivider}/>
</div>
  );
    

};

export default ReferralLink;




