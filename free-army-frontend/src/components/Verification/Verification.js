import React, { useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import axios from 'axios';

const Verification = props => {
    const {history, ...rest} = props;
    const data = queryString.parse(props.location.search);

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_API_URL}/api/verify_account`, data)
        .then((res) => {
            if (res.data.success) {
                history.push('/login', { verified: true });
            } else {
                alert('Error')
            }
        }).catch((error) => {
            alert('Error')
        });
        
    });
    
    return (
        <>
        </>
    )


}

Verification.propTypes = {
    history: PropTypes.object
};

export default withRouter(Verification);