// Inspiration for this component from: https://github.com/ReactTraining/react-router/issues/4293
// Allows you to pass props component that will be rendered by Route
import React from 'react'
import { Route } from 'react-router-dom'

const PropsRoute = ({ props, component: Component, ...rest }) => (
  <Route {...rest} render={(matchProps) => (
    <Component {...matchProps} {...props} />
  )} />
)

export default PropsRoute