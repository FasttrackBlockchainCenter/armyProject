import React from 'react';
import { withRouter } from 'react-router-dom';


const Settings = props => {
	const history = {props}
	const user = JSON.parse(localStorage.getItem('user'));
    
    return(
        <>
            {user ? (
				<>
                    {console.log(user)}
				</>
                ) : (
				history.push('/login')
			)}
        </>
    )
}

export default withRouter(Settings);