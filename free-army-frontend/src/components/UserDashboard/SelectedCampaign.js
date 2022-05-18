import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Campaign from './Campaign';
import axios from 'axios';

const SelectedCampaign = props => {
    
    const camp_id =  props.match.params.id;

	const [ campaigns, setCampaigns ] = useState([]);
	
	const user = JSON.parse(localStorage.getItem('user'));

	useEffect(() => {

		axios.post(`${process.env.REACT_APP_API_URL}/api/get_campaigns`, {auth_token: user.auth_token})
		.then((res) => {
			if(res.data.length) {
				setCampaigns(res.data)
			}
		}).catch((error) => {
			console.log(error)
		});
		
	}, []);
    
	return (
		<Fragment>
            {campaigns.length &&  
                <Campaign 
                    user={user} 
                    campaigns={campaigns} 
                    camp_id={camp_id} 
                />
            }
		</Fragment>
	);
};

export default withRouter(SelectedCampaign);