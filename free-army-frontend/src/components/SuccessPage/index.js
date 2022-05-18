import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import CardActionArea from '@material-ui/core/CardActionArea';
import phone from '../../assets/images/phone-img.png';
import done from '../../assets/images/pngwave.png';

import CardMedia from '@material-ui/core/CardMedia';


const useStyles = makeStyles({
    root: {
        maxWidth: '700px',
        width: '100%',
        margin: 'auto',
        cursor: 'initial',
    },
    media: {
        height: '100%',
    },
    parent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    textCenter: {
        textAlign: 'center'
    },
    blueTxt: {
        color: '#1b236d',
        fontSize: '20px',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    ml20: {
        marginLeft: '20px'
    },
    mt20: {
        marginTop: '20px',
        alignItems: 'center'
    },
    responsiveImg: {
        maxWidth: '80%'
    },
    line: {
        marginTop: '20px',
        padding: '0 25px',
    },
    propStyle: {
        fontSize: '18px',
        color: '#8e8f90'
    },
    valueStyle: {
        fontSize: '18px',
        color: '#1b236d;',
        fontWeight: 'bold',
        textAlign: 'right',
    }
});


function SuccessPage() {
    const classes = useStyles();

    return (
        <div className={classes.parent}>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography className={classes.textCenter} gutterBottom variant="h5" component="h2">
                            <div className={classes.parent}>
                                <span className={classes.blueTxt}>Campaign successfully completed</span>
                                <img className={classes.ml20} width='30' src={done} alt='success'/>
                            </div>
                            <div className={classes.mt20}>
                                <span className={classes.propStyle}>Your download will start soon.</span>
                            </div>

                        </Typography>
                        <Grid className={classes.mt20} container spacing={3}>

                            <Grid item xs={12} sm={5} className={classes.textCenter}>
                                <img className={classes.responsiveImg} width="300" src={phone} alt="phone"/>
                            </Grid>
                            <Grid item xs={12} sm={7}>

                                <div className={classes.line}>
                                    <div className={classes.propStyle}>
                                    
                                    </div>
                                    {/* <div className={classes.valueStyle}>
                                        Close
                                    </div> */}
                                </div>

                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>

            </Card>
        </div>
    )
}

export default SuccessPage;