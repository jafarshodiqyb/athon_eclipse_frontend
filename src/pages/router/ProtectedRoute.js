import queryString from 'query-string';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        let params = queryString.parse(props.location.pathname.substr(7,props.location.pathname.length));
        return((localStorage.getItem('token')||params.token||null)
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
    }} />
)