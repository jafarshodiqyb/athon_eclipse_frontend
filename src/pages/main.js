import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../utils/history';
import { alertActions } from '../store/action/alert.actions';
import { ProtectedRoute } from './router/ProtectedRoute';
import  HomePage from './home/Home';
import LoginPage  from './login/LoginPage';
import RegisterPage  from './register/Register';
import { LinearProgress, Snackbar, withStyles, Typography } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import MuiAlert from '@material-ui/lab/Alert';
import Profile from './profile/Profile'
import { userActions } from '../store/action/user.actions';
import * as _ from 'lodash'
// import Alert from '@material-ui/lab/Alert';
import { compose } from 'redux';
import { PongSpinner  } from "react-spinners-kit";
import { createLoadingSelector } from '../store/action/loading.selector';
import { store } from '../store/configureStore';
import { SpinnerWrapper } from '../components/Wrapper/Wrapper';

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
            backgroundColor: 'rgba(52, 52, 52, 0.8)',
          
            // background: '-webkit-radial-gradient(rgba(20, 20, 20,.8), rgba(0, 0, 0,.8))',
      }
    },
    spinner:{
       left: "-10em", 
       top: "-5em",
       color:'black' 
    }
  })
class Main extends React.Component {
  constructor(props) {
    super(props);
    history.listen((location, action) => {
      // clear alert on location change
      this.props.clearAlerts();
    });
  }


  componentWillReceiveProps(nextProps) {
    if(nextProps.alert.type || nextProps.isFetching ){
      if(!(nextProps.alert.type && nextProps.isFetching)){
        this.props.enqueueSnackbar(!nextProps.isFetching?nextProps.alert.message:'Please Wait', {
          variant: !nextProps.isFetching?nextProps.alert.type:'info',
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          autoHideDuration : !nextProps.isFetching? 3000 :null,
          preventDuplicate: true
          
        });
      }
    } else this.props.closeSnackbar()
    
    window.scrollTo(0, 0);
    this.forceUpdate.bind(this)
  }
  componentDidMount(){
    store.subscribe( this.forceUpdate.bind(this) );
    window.scrollTo(0, 0);
}
  render() {
    const { isFetching,classes } = this.props;
    return (
      <div>
        <div className={isFetching?classes.loading:''}>
          <SpinnerWrapper style={{ left: "-10em", top: "-5em",position:"relative",zIndex:1000}}>
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


function mapStateToProps(state) {
  const {alert} = state 
  const isFetching = loadingSelector(state)
  return { alert,isFetching };
}


const mapDispatchToProps = {
    clearAlerts: alertActions.clear,
};

const loadingSelector = createLoadingSelector([
                          // 'STORIES_GETSTORIES', 
                          // 'CHECKIN_GETCHECKIN',
                          // 'POSTS_GETPOSTS',
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
                          'POSTS_POSTPOSTS',
                          "STORIES_POSTSTORIES",
                          'POSTSTORIES'
                        ]);
export default compose(
  connect(
    mapStateToProps,
    // mapStateToPropsToProps,
    mapDispatchToProps // or put null here if you do not have actions to dispatch
  ),
  withStyles(styles),
  withSnackbar 
)(Main);