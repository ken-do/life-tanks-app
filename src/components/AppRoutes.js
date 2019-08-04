import React from 'react';

import { Route } from "react-router-dom";

import Dashboard from './views/Dashboard';
import tanks from './views/tanks/';
import boosts from './views/boosts/';
import activities from './views/activities/';

const { TankList, TankCreate, TankBoost, TankEdit } = tanks;
const { BoostList, BoostDetails } = boosts;
const { ActivityList, ActivityCreate, ActivityEdit } = activities;

export default (props) => {
    return (
        <div className="routes">
            <Route path="/" exact component={TankList} />
            <Route path="/tanks" exact component={TankList} />
            <Route path="/tanks/create" exact component={TankCreate} />
            <Route path="/tanks/edit/:id" exact component={TankEdit} />
            <Route path="/tanks/boost" exact component={TankBoost} />
            <Route path="/activities" exact component={ActivityList} />
            <Route path="/activities/create" exact component={ActivityCreate} />
            <Route path="/activities/edit/:id" exact component={ActivityEdit} />
            <Route path="/boosts" exact component={BoostList} />
            <Route path="/boosts/details/:id" exact component={BoostDetails} />
        </div>
    )
}