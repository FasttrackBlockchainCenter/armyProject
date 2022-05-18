import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext();


const AppContextProvider = props => {

	const userObj = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : false;
	const [ user, setUser ] = useState(userObj);
	const [ campaigns, setCampaigns ] = useState([]);

	useEffect(() => {

		if (user.auth_token) 
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
		<AppContext.Provider
			value={{
				user,
				campaigns
			}}
		>
			{props.children}
		</AppContext.Provider>
	)

}

export default AppContextProvider;

