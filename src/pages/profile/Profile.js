import { Tab, Tabs, withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import HomeIcon from '@material-ui/icons/Home';
import LockIcon from '@material-ui/icons/Lock';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ProfileCard } from '../../components/Card/ProfileCard';
import { FormPassword } from '../../components/Form/FormPassword';
import TableProfileOverview from '../../components/Table/TableProfileOverview';
import { a11yProps, TabPanel } from '../../components/Tabs/Tabs';
import TopBar from '../../parts/Header/TopBar';
import { FormRegister } from './../../components/Form/FormRegister';
import ChatBar from './../../parts/ChatBar/ChatBar';
import { userActions } from './../../store/action/user.actions';
import * as _  from "lodash"
import { postsActions } from '../../store/action/post.actions';
const styles = (theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  tab: {
    textAlign: "right",
    margin: "0 auto",
    minWidth: '25em', // a number of your choice
    width: '25em',
    "& .MuiTab-wrapper": {
      display: 'block',
      'margin-left': '1em',
      'text-align':  'left',
    },
    "& :hover": {
      color:'blue',
      // ".MuiTabs-indicator": {
      //   color:'red'
      // },
    },
  },
  icon: {
    marginRight: "1em",
  },
});
class Profile extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    const data = this.props;
    this.state = {
      username: data.authentication.payload.username,
      firstName: data.authentication.payload.firstName,
      lastName: data.authentication.payload.lastName,
      image:  data.authentication.payload.image,
      value:0,
      recentPassword:'',
      password:'',
      confirmPassword:'',
      email:data.authentication.payload.email,
      id:data.authentication.payload._id
    };
    this.handleChange = this.handleChange.bind(this)  
    this.submitChangePassword = this.submitChangePassword.bind(this)
  }

  onChangePassword = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  submitChangePassword = ()=>{
    let body = {
      id : this.props.authentication.payload._id,
      oldpassword : this.state.recentPassword,
      newpassword : this.state.password,
    }
    if(!body.oldpassword && (!this.props.authentication.payload.salt && !this.props.authentication.payload.hash))
    {
      body.isSetPassword = true
      this.props.setPassword(body)
    } else if(!_.some(body, _.isEmpty)){ 
      this.props.changePassword(body)
    }
  }
  handleChange (event,newValue) {
    event.preventDefault();
    
    this.setState({value : parseInt(event.currentTarget.getAttribute('index'))})
  }
  componentWillReceiveProps(nextState){
    if(nextState.users && nextState.users.payload) this.setState({ image : nextState.authentication.payload.image})
  }

  componentDidMount() {
    this.props.getAllposts();
    this.forceUpdate();
    window.scrollTo(0, 0);
  }

  render() {
    const {classes } = this.props;
    console.log(this.props)
    return (
      <div>
        {this.props.hashtag && <TopBar {...this.props} />}
        <div className="container">
          <div className="row">
            <div className="col-md-4 mt-4">
              <ProfileCard {...this.props} readOnly={false} />
              <Card className="mt-4" variant="outlined" square>
                <Tabs
                  value={this.state.value}
                  onChange={(e) => this.handleChange(e)}
                  aria-label="simple tabs example"
                  orientation="vertical"
                  indicatorColor="primary"
                  textColor="primary"
                >
                  <Tab
                    icon={<HomeIcon className={classes.icon} />}
                    selected={this.state.value}
                    index={0}
                    className={classes.tab}
                    label="Account Overview"
                    {...a11yProps(0)}
                  />
                  <Tab
                    icon={<EditIcon className={classes.icon} />}
                    selected={this.state.value}
                    index={1}
                    className={classes.tab}
                    label="Edit Profile"
                    {...a11yProps(1)}
                  />
                  <Tab
                    icon={<LockIcon className={classes.icon} />}
                    selected={this.state.value}
                    index={2}
                    className={classes.tab}
                    label="Change Password"
                    {...a11yProps(2)}
                  />
                </Tabs>
              </Card>
            </div>
            <div className="col-md-8 mt-4 mb-4">
              <Card className={classes.root} variant="outlined">
                <TabPanel value={this.state.value} index={0}>
                  <Typography
                    variant="h4"
                    color="textPrimary"
                    component="p"
                    className="mt-4 text-left p-4"
                  >
                    Account Overview
                  </Typography>
                  <TableProfileOverview hide={true} {...this.props} onChange={(e)=>this.handleChange(e)}/>
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                  <Typography
                    variant="h4"
                    color="textPrimary"
                    component="p"
                    className="mt-4 p-4 text-left"
                  >
                    Edit Profile
                  </Typography>
                  <FormRegister hide={true} {...this.props} />
                </TabPanel>
                <TabPanel value={this.state.value} index={2}>
                <Typography
                    variant="h4"
                    color="textPrimary"
                    component="p"
                    className="mt-4 p-4 text-left"
                  >
                    Change Password
                  </Typography>
                  <div className="mt-4">
                    {/* <SecurityQuestions/> */}
                    <FormPassword {...this.state} {...this.props.authentication} isRegister={false} onChange={(e)=>this.onChangePassword(e)} submitChangePassword={()=>this.submitChangePassword()}/>
                  </div>
                </TabPanel>
              </Card>
            </div>
          </div>
        </div>
        <ChatBar />
        {/* <Copyright /> */}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return state;
}

const mapDispatchToProps  = {
  updateUser : userActions.updateUser,
  changePassword:userActions.changePassword,
  setPassword:userActions.setPassword,
  getAllposts: postsActions.getAllposts,

};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps  // or put null here if you do not have actions to dispatch
  ),
  withStyles(styles)
)(Profile);
