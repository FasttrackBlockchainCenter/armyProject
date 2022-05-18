import React, {useState, useEffect} from 'react';
import { Doughnut } from 'react-chartjs-2';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '300px'
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  device: {
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  deviceIcon: {
    color: theme.palette.icon
  }
}));

const ProgressChart = props => {
  const { className, ...rest } = props;

  const user = JSON.parse(localStorage.getItem('user'));

  const [ completed, setCompleted ] = useState(0);
  const [ remaining, setRemaining ] = useState(0);

  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {

    axios.post(`${process.env.REACT_APP_API_URL}/api/campaign_progress`, {auth_token: user.auth_token})
    .then((res) => {
        if ( res.data.success ) {
          setCompleted(res.data.completed);
          setRemaining(res.data.remaining);
        }
    }).catch((error) => {
        console.log(error)
    });
    
  });

  const data = {
    datasets: [
      {
        data: [ completed, remaining ],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.warning.main
        ],
        borderWidth: 8,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white
      }
    ],
    labels: ['Completed', 'Remaining' ]
  };

  const options = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: '#fff',
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary
    }
  };

  const details = [
    {
      title: 'Completed',
      value: completed,
      color: theme.palette.primary.main
    },
    {
      title: 'Remaining',
      value: remaining,
      color: theme.palette.warning.main
    }
  ];

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="My campaigns"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut
            data={data}
            options={options}
          />
        </div>
        <div className={classes.stats}>
          {details.map(item => (
            <div
              className={classes.device}
              key={item.title}
            >
              <Typography variant="body1">{item.title}</Typography>
              <Typography
                style={{ color: item.color }}
                variant="h2"
              >
                {item.value}
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

ProgressChart.propTypes = {
  className: PropTypes.string
};

export default ProgressChart;