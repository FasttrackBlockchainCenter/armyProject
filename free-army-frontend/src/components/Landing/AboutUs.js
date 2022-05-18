import React from 'react';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Icon from './../../assets/images/falogo.png';

function AboutUs() {
    return (
        <section className="about-us">
            <div className="overlay"></div>
            <div className=" p-20">
                <Container>
                    <Grid container spacing={3} className="align-center">

                        <Grid item xs={12}>
                            <div className="about-header">
                                <img width={120} src={Icon} alt="about"/>
                                <span className="comp-name">About us</span>
                            </div>
                            <div className="p-20">
                                Free Army is very simply a method by which we show you how to cash out on referral programs that are available.

                                Some companies will pay you anywhere from $5-$100 just to set up an account... Even if you never use it.

                                Whats in it for us?

                                We make money by sending you to them. No gimmicks. This is a simple site.

                                Let's get started.
                            </div>
                            <Link to='/login'>
                                <button className="join-btn">join us</button>
                            </Link>
                        </Grid>

                    </Grid>
                </Container>
            </div>
        </section>
    )
}

export default AboutUs