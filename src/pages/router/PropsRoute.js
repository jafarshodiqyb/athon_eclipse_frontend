
import React from 'react';
import { Route } from 'react-router-dom';

const PropsRoute = ({ props, component: Component, ...rest }) => (
  <Route {...rest} render={(matchProps) => (
    <Component {...matchProps} {...props} />
  )} />
)

export default PropsRoute