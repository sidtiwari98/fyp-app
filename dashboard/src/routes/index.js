import React from 'react';
import {Switch} from 'react-router-dom';
import Route from './Route'
import LoginPage from '../pages/LoginPage/LoginPage'
import StationPage from '../pages/StationPage/StationPage'
import StorePage from '../pages/StorePage/StorePage'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'


function Routes() {
  return (
    <Switch>
      <Route  path="/" exact component={LoginPage} />
      <Route path="/stations/:id" component={StorePage} />
      <Route path="/stations" component={StationPage} />
      {/* redirect user to Login page if route does not exist */}
      <Route component={NotFoundPage} />
    </Switch>
  );
}

export default Routes
