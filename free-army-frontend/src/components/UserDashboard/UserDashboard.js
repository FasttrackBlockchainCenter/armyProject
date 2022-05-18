import React, { Fragment, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { AppContext } from "../../context/AppContext";
import CampaignList from './CampaignList';

const UserDashboard = props => {

	const { campaigns } = useContext(AppContext);
    
	return (
		<Fragment>
			<CampaignList campaigns={campaigns} />
		</Fragment>
	);
};

export default withRouter(UserDashboard);