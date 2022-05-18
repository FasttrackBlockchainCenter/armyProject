import React from 'react';
import { Switch } from 'react-router-dom';
import { Main, Main as MainLayout, Minimal as MinimalLayout } from './layouts';
import  RouteWithLayout from './RouteWithLayout';

import { SignUp } from './components';
import { NewCampaign } from './components';
import { Login } from './components';
import { Verification } from './components/Verification';
import  SuccessPage  from './components/SuccessPage';
import { UserDashboard } from './components/UserDashboard';
import { Settings } from './components/Settings';
import { InviteFriends } from './components/InviteFriends';
import { Progress } from './components/Progress';
import { Landing } from './components/Landing';
import { SelectedCampaign } from './components/UserDashboard';
import { ResetPassword } from './components';
import {SetNewPassword} from './components';

const Routes = () => {
    return (
        <Switch>
            <RouteWithLayout 
                component={UserDashboard}
                exact
                path='/dashboard'
                layout={MainLayout}
            />
            <RouteWithLayout 
                component={NewCampaign}
                exact
                path='/create-campaign'
                layout={MainLayout}
            />
            <RouteWithLayout 
                component={Landing}
                exact
                path='/'
                layout={MinimalLayout}
            />
            <RouteWithLayout 
                component={Login}
                exact
                path='/login'
                layout={MinimalLayout}
            />
            <RouteWithLayout 
                component={SignUp}
                path='/sign-up'
                layout={MinimalLayout}
            />
            <RouteWithLayout 
                component={ResetPassword}
                exact
                path='/reset-password'
                layout={MinimalLayout}
            />
            <RouteWithLayout 
                component={SetNewPassword}
                strict
                exact
                path='/new-password'
                layout={MinimalLayout}
            />
            <RouteWithLayout 
                component={Verification}
                strict
                exact
                path='/login/verify'
                layout={MinimalLayout}
            />
            <RouteWithLayout 
                component={SelectedCampaign}
                exact
                path='/dashboard/campaign/:id'
                layout={MainLayout}
            />
            <RouteWithLayout 
                component={Progress}
                path='/progress'
                layout={MainLayout}
            />
            <RouteWithLayout 
                component={InviteFriends}
                path='/invite-friends'
                layout={MainLayout}
            />
            
            <RouteWithLayout
                component={SuccessPage}
                path='/successpage'
                layout={MainLayout}
            />
            <RouteWithLayout 
                component={Settings}
                path='/settings'
                layout={MainLayout}
            />
        </Switch>
    )
}

export default Routes;