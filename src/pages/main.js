import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../utils/history';
import { alertActions } from '../store/action/alert.actions';
import { ProtectedRoute } from './router/ProtectedRoute';
import  HomePage from './home/Home';
import LoginPage  from './login/LoginPage';
import RegisterPage  from './register/Register';
import { LinearProgress, Snackbar, withStyles } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Profile from './profile/Profile'
import { userActions } from '../store/action/user.actions';
import * as _ from 'lodash'
// import Alert from '@material-ui/lab/Alert';
import { compose } from 'redux';
import { PongSpinner  } from "react-spinners-kit";
import { createLoadingSelector } from '../store/action/loading.selector';
import { store } from '../store/configureStore';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const styles = (theme) => ({
    loading: {
      
        position: 'fixed',
        zIndex: 999,
        height: '2em',
        width: '2em',
        overflow: 'show',
        margin: 'auto',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        "&:before": {
            content:  '""',
            display: 'block',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(52, 52, 52, 0.8)'
          
            // background: '-webkit-radial-gradient(rgba(20, 20, 20,.8), rgba(0, 0, 0,.8))',
      }
    },
    spinner:{
       left: "-10em", 
       top: "-5em",
       color:'black' 
    }
  })
  const SpinnerWrapper = ({ children}) => {
    return (
        <div style={{ left: "-10em", 
        top: "-5em",position:"relative"}}>
            {children}
            
        </div>
    );
  };
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
    this.forceUpdate.bind(this)
  }
  componentDidMount(){
    store.subscribe( this.forceUpdate.bind(this) );
}
  render() {
    const { alert,isFetching,classes } = this.props;
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
        <div className={isFetching?classes.loading:''}>
          <SpinnerWrapper>
          <PongSpinner
            size={350}
            color="white"
            loading={isFetching}
          />
          </SpinnerWrapper>
        </div>
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

// function mapStateToProps(state) {
//   state.isFetching = loadingSelector(state)
//   return state
// }

function mapStateToProps(state) {
  const { alert } = state;
  const isFetching = loadingSelector(state)
  return { alert,isFetching };
}


const mapDispatchToProps = {
    clearAlerts: alertActions.clear,
    getUser : userActions.getUser
};

// const connectedApp = connect(mapStateToProps, mapDispatchToProps)(Main);
// export { connectedApp as Main };

// Show loading when any of GET_TODOS_REQUEST, GET_USER_REQUEST is active
const loadingSelector = createLoadingSelector([
                          'STORIES_GETSTORIES', 
                          'CHECKIN_GETCHECKIN',
                          'CHECKIN',
                          'CHECKOUT',
                          'ACTIVITY',
                          'DEL_ACTIVITY',
                          'UPDATE_ACTIVITY',
                          'USER_REGISTER',
                          'USER_UPDATE',
                          'USERS_LOGIN',
                          'USERS_PROFILECHANGE',
                          'USER_GETUSER',
                        ]);
export default compose(
  connect(
    mapStateToProps,
    // mapStateToPropsToProps,
    mapDispatchToProps // or put null here if you do not have actions to dispatch
  ),
  withStyles(styles)
)(Main);