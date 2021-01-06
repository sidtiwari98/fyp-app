import React from 'react';
import { Route } from 'react-router-dom';

export default function RouteWrapper({component: Component, ...rest}) {
  return <Route {...rest} component={Component} />;
}