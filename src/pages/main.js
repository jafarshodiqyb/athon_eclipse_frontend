import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../utils/history';
import { alertActions } from '../store/action/alert.actions';
import { ProtectedRoute } from './router/ProtectedRoute';
import  HomePage from './home/Home';
import LoginPage  from './login/LoginPage';
import RegisterPage  from './register/Register';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Profile from './profile/Profile'
// import Alert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
    history.listen((location, action) => {
      // clear alert on location change
      this.props.clearAlerts();
    });
    this.handleSnackBar = this.handleSnackBar.bind(this);
  }

  handleSnackBar(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    // this.setState({open:false})
    this.setState({ open: false });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.alert.type && nextProps.alert.type == 'error' ||nextProps.alert.type == 'success')
    {
      this.setState({
        open: true,
      });
    }
  }
  render() {
    const { alert } = this.props;
    const { open } = this.state;
    return (
      <div>
        {alert.message && (
          <Snackbar
            open={alert.message && open}
            autoHideDuration={1500}
            onClose={this.handleSnackBar}
          >
            <Alert onClose={this.handleSnackBar} severity={alert.type}>
              {alert.message}
            </Alert>
            {/* {alert.message} */}
          </Snackbar>
          //   <div className={`alert ${alert.type}`}>{alert.message}</div>
        )}
        <Router history={history}>
          <Switch>
            <ProtectedRoute exact path="/" component={HomePage} />
            <ProtectedRoute exact path="/profile" component={Profile} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      </div>
    );
  }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(Main);
export { connectedApp as Main };