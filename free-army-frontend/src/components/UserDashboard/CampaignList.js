import React from 'react';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    section: {
        padding: '20px',
    },
    root: {
        padding: '20px 0',
    },
    campaignItem: {
        textAlign: 'center',
        position: 'relative',
        paddingTop: '10px',
        cursor: 'pointer',
    },
    imgContainer: {
        position: 'relative',
        background: '#fff',
        boxShadow: 'rgba(0, 0, 0, 0.08) 0px 0px 0px',
        borderRadius: '8px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'rgb(231, 235, 238)',
        borderImage: 'initial',
        transition: 'all 0.2s linear',
        '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: 'rgba(0, 0, 0, 0.12) 0px 8px 24px',
            zIndex: '1',
            position: 'relative',
        },
    },
    img: {
        width: 'auto',
        height: '130px',
        margin: '0 auto',
    },
    campaignCard: {
        '& img': {
            opacity: 0.2,
        },
        '& div' : {
            opacity: 0.2,
        }
    },
    active: {
        '& img': {
            opacity: 1,
        },
        '& div' : {
            opacity: 1,
        }
    },
    title: {
        fontSize: '18px',
        fontWeight: '700',
        marginTop: '30px',
        transition: 'color 0.2s linear',
        marginBottom: '0',
        color: '#292929',
    },
    badge: {
        fontSize: '16px',
        borderRadius: '4px',
        backgroundColor: '#1dc9b7',
        boxShadow: '0px 10px 20px 0px rgba(29, 201, 183, 0.2)',
        position: 'absolute',
        top: '-10px',
        right: '-10px',
        padding: '0px 13px',
        color: '#fff',
        fontWeight: '500',
    },
    tabTitle: {
        fontSize: '1.3rem',
        fontWeight: '500',
        color: '#595d6e',
    },
    description: {
        position: 'relative',
        width: '100%',
        maxHeight: '3rem',
        display: 'inline-block',
        overflow: 'hidden',
        color: '#5a5b5e',
        '&::after': {
            content: '""',
            textAlign: 'right',
            position: 'absolute',
            top: '1.5rem',
            right: 0,
            width: '35%',
            height: '1.5rem',
            background: 'linear-gradient(90deg,hsla(0,0%,100%,0),#fff 75%)',
        }
    },
    content: {
        padding: '20px 15px',
    }
}));


const CampaignList = props => {

    const classes = useStyles();
    const { history, campaigns, ...rest } = props;
    let user = JSON.parse(localStorage.getItem('user'));

    const clickHandler = id => {
        let campaign = campaigns.find(a => a.id === id)
        if (!campaign.completed) {
            history.push('/dashboard/campaign/'+ id);
        }
    }

    const clickCreateNew = () => {
        history.push('/create-campaign');
    }

    const activeArr = campaigns.filter(camp => camp.completed === false);

    return (
        <div className={classes.section}>
            <h3 className={classes.tabTitle}>
                Campaigns
            </h3>
            <Grid
                container
                spacing={4}
                className={classes.root}
            >
                
                <Grid
                    item
                    lg={3}
                    md={3}
                    sm={6}
                    xs={12}
                >
                    <div className={classes.campaignItem} onClick={() => clickCreateNew()}>
                        <div className={clsx({
                            [classes.imgContainer] : true,
                            [classes.campaignCard]: true
                            })}>

                            <div className={classes.content}>
                                <h6 className={classes.title}>Create new</h6>
                            </div>

                        </div>
                    </div>
                </Grid>

            {
                campaigns.map( ( campaign, index ) => (
                    <Grid
                        item
                        lg={3}
                        md={3}
                        sm={6}
                        xs={12}
                    >
                        <div className={classes.campaignItem} onClick={() => clickHandler(campaign.id)}>
                            <div className={clsx({
                                [classes.imgContainer] : true,
                                [classes.campaignCard]: true,
                                [classes.active] : ( activeArr.length ? activeArr[0].id == campaign.id : false ),

                                })}>
                                <img src={campaign.image} className={clsx({
                                    [classes.img]: true,
                                    
                                })} />

                                {campaign.completed && 
                                    <span className={classes.badge}>
                                        Completed
                                    </span>
                                }
                                <div className={classes.content}>
                                    <h6 className={classes.title}>{campaign.title}</h6>
                                    <span className={classes.description}>{campaign.description}</span>
                                </div>

                            </div>
                        </div>
                    </Grid>
                ))

            }
            </Grid>
        </div>
    )

}

export default withRouter(CampaignList);