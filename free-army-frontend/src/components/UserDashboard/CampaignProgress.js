import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';


const useStyles = makeStyles(theme => ({
    circle: {
        width: '15px',
        height: '15px',
        borderRadius: '50%',
        display: 'flex',
        margin: '0 20px',
        background: '#1f2231',
        zIndex: 1,
        '&::before': {
            content: '""',
            position: 'absolute',
            background: '#1f2231',
            height: '3px',
            width: '56px',
            top: '6px',
            marginLeft: '15px',
        },
        '&:last-of-type::before': {
            content: 'none',
        },
    },
    active: {
        background: '#5d78ff',
    },
    completed: {
        '&::before': {
            background: '#5d78ff',
        }
    }
}));


const CampaignProgress = props => {

    const classes = useStyles();

    const { campaigns } = props;

    const activeArr = campaigns.filter(camp => camp.completed === false);

    return (
        <div className="flex flex-1 relative">
            {
                campaigns.map( item => (
                    <span className={clsx({
                        [classes.circle] : true,
                        [classes.active] : item.completed || ( activeArr.length ? activeArr[0].id == item.id : '' ),
                        [classes.completed] : item.completed,
                    })} >
                    </span>
                ))
            }
        </div>
    )
}

CampaignProgress.propTypes = {
    campaigns: PropTypes.array
  };

export default CampaignProgress;