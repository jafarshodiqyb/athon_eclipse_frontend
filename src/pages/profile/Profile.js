import {
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
const styles = (theme) => ({
  root: {
    width: "100%",
    //   maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
});
class Profile extends React.Component {
  constructor(props) {
    super(props);
    const data = this.props;
    this.state = {
      username: data.authentication.user.username,
      firstName: data.authentication.user.firstName,
      lastName: data.authentication.user.lastName,
      image:  data.authentication.user.image 
    };

  }
  componentWillReceiveProps(nextState){
    if(nextState.users.items && nextState.users.items.url){
      let body = {
        username : this.state.username,
        image : nextState.users.items.url
      }
      this.props.updateUser(body)
      this.setState({
        image:nextState.users.items.url,
      })
      this.forceUpdate()
    }
  }
  render() {
    const {classes } = this.props;
    return (
      <div>
        <TopBar />
        <div className="container">
          <div className="row">
            <div className="col-md-4 mt-4">
              <ProfileCard {...this.state} readOnly={false}/>
            </div>
            <div className="col-md-8 mt-4">
              <Card className={classes.root} variant="outlined">
                <Typography
                  variant="h4"
                  color="textPrimary"
                  component="p"
                  className="mt-4"
                >
                  User Profile
                </Typography>
                <FormRegister hide={true} {...this.props} />
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

// function mapStateToProps(state) {
//   const {authentication,users} = state
//   return {authentication,users};
// }
const mapStateToProps = state => ({
  authentication: state.authentication,
  users: state.users,
});

const mapDispatchToProps  = {
  updateUser : userActions.updateUser
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps  // or put null here if you do not have actions to dispatch
  ),
  withStyles(styles)
)(Profile);
