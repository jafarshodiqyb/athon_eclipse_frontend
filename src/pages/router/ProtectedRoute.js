import queryString from 'query-string';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        return((localStorage.getItem('token'))
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
    }} />
)