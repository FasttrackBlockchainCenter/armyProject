import React from 'react';
import {AppBar, Toolbar, Button, Icon} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/styles';
import CampaignProgress from './CampaignProgress';
import { useMediaQuery } from '@material-ui/core';
import clsx from 'clsx';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        top: 'initial',
        bottom: 0,
        zIndex: 10,
        boxShadow: '0px -2px 4px -1px rgba(0,0,0,0.2), 0px -4px 5px 0px rgba(0,0,0,0.14), 0px -1px 10px 0px rgba(0,0,0,0.12)'
    },
    button: {
        marginLeft: 'auto',
    },
    shiftContent: {
        paddingLeft: 240,
    }
})); 

const BottomBar = props =>
{   
    const classes = useStyles();
    const {campaigns, ...rest} = props;

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
        defaultMatches: true
    });

    return (
            <AppBar className={clsx({
                [classes.root] : true,
                [classes.shiftContent]: isDesktop,
            })} color="default">
                <Toolbar className="px-16 py-0 flex items-center">

                    <CampaignProgress campaigns={campaigns} />

                    <div className="flex flex-2">
                        <Button
                            role="button"
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            disabled={!props.completed}
                            onClick={props.nextCampaign}
                        >
                            <span>Next campaign</span>
                        </Button>
                    </div>

                </Toolbar>
            </AppBar>
    );
}

export default BottomBar;
