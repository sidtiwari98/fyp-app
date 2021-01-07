import React from 'react';
import {Switch} from 'react-router-dom';
import Route from './Route'
import LoginPage from '../pages/LoginPage/LoginPage'
import StationPage from '../pages/StationPage/StationPage'
import StorePage from '../pages/StorePage/StorePage'
import StatsPage from '../pages/StatsPage/StatsPage'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'


function Routes() {
  return (
    <Switch>
      <Route  path="/" exact component={LoginPage} />
      <Route path="/stations/:station" component={StorePage} />
      <Route path="/stations" component={StationPage} />
      <Route path="/stats" component={StatsPage} />
      {/* redirect user to NotFoundPage if route does not exist */}
      <Route component={NotFoundPage} />
    </Switch>
  );
}

export default Routes