import React from 'react';
import {Switch} from 'react-router-dom';
import Route from './Route'
import HomePage from '../pages/HomePage/HomePage'
import StationPage from '../pages/StationPage/StationPage'
import StorePage from '../pages/StorePage/StorePage'
import StatsPage from '../pages/StatsPage/StatsPage'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import LoginPage from '../pages/LoginPage/LoginPage';


function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={LoginPage} />
      <Route path="/home/:stationName/:shopName" component={StatsPage} />
      <Route path="/home/:stationName" component={StationPage} />
      <Route path="/home" exact component={HomePage} />
      {/* redirect user to NotFoundPage if route does not exist */}
      <Route component={NotFoundPage} />
    </Switch>
  );
}

export default Routes
