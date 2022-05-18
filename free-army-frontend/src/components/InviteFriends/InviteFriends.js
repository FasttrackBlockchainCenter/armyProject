import React, {useState} from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import './InviteFriends.css';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import ReferralLink from './RefferralLink';
import ReferralTable from './ReferralTable';
import shareIcon from '../../assets/images/share-icon.png';

function InviteFriends() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [friendEmail, setFriendEmail] = useState([]);
    const [ inputs, setInputs ] = useState(['email-0']);

    const invite_friend = (e) => {
        let error = false;
        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        friendEmail.forEach(function( item ) {
            if (!validateEmail(item)) {  
                error = true;
            }
        });

        if (!error) {
            setFriendEmail([])
            axios.post(`${process.env.REACT_APP_API_URL}/api/invite_friend`, {
                name: `${user.first_name} ${user.last_name}`,
                email: user.email,
                friendEmail: friendEmail
            })
            .then((res) => {
                console.log(res);
                alert('Email sent')
            }).catch((error) => {
                console.log(error)
                alert('Error sending the message')
            });
        }

    }

    const appendInput = () => {
        let newInput = `email-${inputs.length}`
        setInputs(inputs.concat(newInput));
    }

    return (
        <div className="inviteContainer">
            <div className="InviteFriendsContent">
                <section className="main">
                    <Grid container>
                        <Grid 
                            item
                            lg={6}
                            md={6}
                            sm={12}
                        >
                            <div className="email-container">
                                <img src={shareIcon} alt="share icon" className="share-icon" />
                                <div className="referral-instructions">
                                    <h2 className="referral-title">Refer Friends Make <br/>More Money!</h2>
                                    <p className="referral-description">For every friend you invite you can make $10 when they sign-up with FREE.ARMY and complete any Campaign!</p>
                                    <p className="referral-description">In addition, each Campaign they complete will result in a percentage of that campaign being paid back to you!</p>
                                </div>
                            </div>
                        </Grid>
                        <Grid
                            item
                            lg={6}
                            md={6}
                            sm={12}
                        >
                            <div className="email-container">
                                <ReferralLink user={user}></ReferralLink>
                                <h3 className="email-link-CTA">OR <br/>send them all an invite via email!</h3>
                            
                                {
                                    inputs.map( (index, input) => (
                                        <input name='email' placeholder={'yourfriend@example.com'} key={input} type="text" value={friendEmail[index]} onBlur={(e) => setFriendEmail(friendEmail.concat(e.target.value))}/>
                                    ))
                                }
                                    <IconButton
                                     aria-label="add" 
                                     onClick={appendInput} 
                                     className="add-btn"
                                     color="primary"
                                    >
                                        <AddIcon/>
                                    </IconButton>
                                    <label htmlFor="cb" className="button-invite" onClick={invite_friend}>SEND</label>
                            </div>
                            <input type="checkbox" id="cb" />
                            {/* <label htmlFor="cb" className={`button reset ${ friendEmail === '' ? 'disabled' : ''}`} >Sending is successfly</label> */}
                        </Grid>
                       
                    </Grid>
                </section>
            </div>
            <ReferralTable/>
        </div>
    )
}

export default InviteFriends;
