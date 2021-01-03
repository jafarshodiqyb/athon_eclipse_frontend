import {
  Paper,
  Tab,
  Tabs,
  withStyles,
} from "@material-ui/core";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { connect } from "react-redux";
import { userActions } from "./../../store/action/user.actions";
import TopBar from "../../parts/Header/TopBar";
import { compose } from "redux";
import * as _ from "lodash";
import ChatBar from "./../../parts/ChatBar/ChatBar";
import {FormRegister} from "./../../components/Form/FormRegister"
import {ProfileCard} from "../../components/Card/ProfileCard";
import { a11yProps, TabPanel } from "../../components/Tabs/Tabs";
import HomeIcon from '@material-ui/icons/Home';
import EditIcon from '@material-ui/icons/Edit';
import LockIcon from '@material-ui/icons/Lock';
import TableProfileOverview from "../../components/Table/TableProfileOverview";
import { FormPassword } from "../../components/Form/FormPassword";
import SecurityQuestions from "../../components/Form/SecurityQuestions";

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
    const data = this.props;
    console.log(props)
    this.state = {
      username: data.authentication.user.username,
      firstName: data.authentication.user.firstName,
      lastName: data.authentication.user.lastName,
      image:  data.authentication.user.image,
      value:0,
      recentPassword:'',
      password:'',
      confirmPassword:'',
      email:data.authentication.user.email
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
      username : this.state.username,
      oldpassword : this.state.recentPassword,
      newpassword : this.state.password,
    }
    this.props.changePassword(body)
  }
  handleChange (event,newValue) {
    event.preventDefault();
    
    this.setState({value : parseInt(event.currentTarget.getAttribute('index'))})
  }
  componentWillReceiveProps(nextState){
    if(nextState.authentication && nextState.authentication.user) this.setState({ image : nextState.authentication.user.image})
  }


  render() {
    const {classes } = this.props;

    return (
      <div>
        <TopBar />
        <div className="container">
          <div className="row">
            <div className="col-md-4 mt-4">
              <ProfileCard {...this.state} readOnly={false} />
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
                    className="mt-4 text-left"
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
                    className="mt-4 text-left"
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
                    className="mt-4 text-left"
                  >
                    Change Password
                  </Typography>
                  <div className="mt-4">
                    {/* <SecurityQuestions/> */}
                    <FormPassword {...this.state} isRegister={false} onChange={(e)=>this.onChangePassword(e)} submitChangePassword={()=>this.submitChangePassword()}/>
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
const mapStateToProps = state => ({
  authentication: state.authentication,
  users: state.users,
});

const mapDispatchToProps  = {
  updateUser : userActions.updateUser,
  changePassword:userActions.changePassword
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps  // or put null here if you do not have actions to dispatch
  ),
  withStyles(styles)
)(Profile);
