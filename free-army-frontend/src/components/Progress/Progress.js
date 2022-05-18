import React from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProgressChart from './ProgressChart';

const Progress = props => {
    const {history, ...rest} = props;



    return (
        <>
            <ProgressChart/>
        </>
    )


}

Progress.propTypes = {
    history: PropTypes.object
};

export default withRouter(Progress);