import React from 'react';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

let style = {
    alignItems: 'center'
};
function Header() {
    return (
        <section className="intro">
            <div className="overlay"></div>


            <Container>
                <div className="intro-section">
                    <Grid container style={style}>

                        <Grid item xs={12}>
                            <div>
                            <div className="comp-name">
                                WHAT IS FREE ARMY?
                            </div>
                            <p className="comp-desc">
                                Get paid to join programs up to $100 NOW<br/>
                                Ready to get paid to participate in programs? Learn More.
                            </p>

                                <Link to='/login'>
                                    <button className="join-btn">join us</button>
                                </Link>
                </div>
                        </Grid>
                    </Grid>
                </div>

            </Container>

        </section>
    )
}

export default Header