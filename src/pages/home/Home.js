import { Button, Snackbar, withStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import InputIcon from "@material-ui/icons/Input";
import Alert from "@material-ui/lab/Alert";
import * as _ from "lodash";
import * as moment from "moment";
import React from "react";
import { connect } from "react-redux";
import { FireworkSpinner } from "react-spinners-kit";
import { compose } from "redux";
import { ActivityCard } from "../../components/Card/ActivityCard";
import { ProfileCard } from "../../components/Card/ProfileCard";
import { DialogConfirmation } from "../../components/Dialog/DialogConfirmation";
import { SpinnerWrapper } from "../../components/Wrapper/Wrapper";
import TopBar from "../../parts/Header/TopBar";
import { postsActions } from "../../store/action/post.actions";
import { storiesActions } from "../../store/action/stories.actions";
import ChatBar from "./../../parts/ChatBar/ChatBar";
import { Content } from "./../../parts/Content/Feed/Content";
import Content2 from "./../../parts/Content/Side/Content2";
import Copyright from "./../../parts/Footer/Copyright";
import { activityActions } from "./../../store/action/activity.actions";
import { checkActions } from "./../../store/action/check.actions";
import { userActions } from "./../../store/action/user.actions";
const styles = (theme) => ({
  root: {
    width: "100%",
    //   maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  flex: {
    display: "flex",
  },
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  media: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
});
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    const data = this.props;
    this.state = {
      user: data.authentication.payload,
      modal: false,
      modalType: "",
      activity: null,
      ids: {
        parentId: "",
        childId: "",
      },
      checkProfile: false,
    };
    this.handleOnClose.bind(this);
  }

  componentDidMount() {
    this.props.getAllStories();
    this.props.getAllposts();
    this.props.getCheckin(this.props.authentication.payload._id);
    this.forceUpdate();
    window.scrollTo(0, 0);
    // if(this.state.user)
    let cek = _.some(this.state.user, (value, i) => {
      // console.log(this.state.user['isSetPassword'])
        return value === undefined || value === "" || value === null || !this.state.user['isSetPassword'];
    });
    this.setState({ checkProfile: cek });
  }

  checkin() {
    return (e) => this.props.checkin(this.props.authentication.payload._id);
  }
  checkout() {
    return (e) => this.props.checkout(this.props.authentication.payload._id);
  }

  handleOnClose(type) {
    this.setState({
      checkProfile: false,
    });
  }

  render() {
    const { check, classes } = this.props;
    const { user } = this.state;
    let title, date;
    if (
      check.item &&
      (check.item.lastCheckOut === null ||
        (!moment(check.item.lastCheckOut).isSame(moment(), "day") &&
          moment(check.item.lastCheckIn).isSame(moment(), "day")))
    ) {
      title = "Last Check In";
      date = moment(check.item.lastCheckIn).format("DD/MM/YYYY HH:mm");
    } else if (
      check.item &&
      (check.item.lastCheckOut ||
        (!moment(check.item.lastCheckIn).isSame(moment(), "day") &&
          !moment(check.item.lastCheckOut).isSame(moment(), "day")))
    ) {
      title = "Last Check Out";
      date = moment(check.item.lastCheckOut).format("DD/MM/YYYY HH:mm");
    } else {
      title = "";
      date = "";
    }
    let isNotCheckinToday = true;
    if (check)
      isNotCheckinToday =
        _.isEmpty(check) ||
        (check &&
          check.item &&
          !moment(check.item.lastCheckIn).isSame(moment(), "day"));

    return (
      <div>
        <TopBar />
        <div className="container">
          <div className="row">
            <div className="col-md-3 mt-4">
              <ProfileCard {...user} readOnly={true} />
              <Card className={" mt-4"} variant="outlined">
                <div className="pl-4 pt-2">
                  <Typography component="h6" variant="h6" align="left">
                    {title}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    align="left"
                  >
                    {date}
                  </Typography>
                </div>
                {/* <InfoTitle>50 Days of Premium!</InfoTitle>
                    <InfoSubtitle>Get it before 01.01.2020</InfoSubtitle> */}
                <div className="float-right pr-2 pb-2 mt-2">
                  <SpinnerWrapper
                    style={{
                      position: "absolute",
                      zIndex: "1",
                      paddingLeft: "8%",
                      "margin-top": "-5%",
                    }}
                  >
                    <FireworkSpinner
                      size={60}
                      color="red"
                      loading={isNotCheckinToday}
                    />
                  </SpinnerWrapper>
                  <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.button}
                    startIcon={<InputIcon />}
                    size="small"
                    style={{ zIndex: 2 }}
                    onClick={
                      _.isEmpty(check) ||
                      (check &&
                        check.item &&
                        !moment(check.item.lastCheckIn).isSame(moment(), "day"))
                        ? this.checkin()
                        : this.checkout()
                    }
                    disabled={
                      check.item &&
                      moment(check.item.lastCheckIn).isSame(moment(), "day") &&
                      moment(check.item.lastCheckOut).isSame(moment(), "day")
                    }
                  >
                    {_.isEmpty(check) ||
                    (check &&
                      check.item &&
                      !moment(check.item.lastCheckIn).isSame(moment(), "day"))
                      ? "CHECKIN"
                      : "CHECKOUT"}
                  </Button>
                </div>
              </Card>

              <ActivityCard {...this.state} />
            </div>
            <div className="col-md-6 mt-4">
              <Content {...this.state} {...this.props} />
            </div>
            <div className="col-md-3 mt-4">
              <Content2 {...this.props} />
            </div>
          </div>
        </div>
        <ChatBar />
        <Copyright />
        <DialogConfirmation
          open={this.state.checkProfile}
          onClose={() => this.handleOnClose("updateProfile")}
          dialogTitle="Your profile is not complete. Do you want to update?"
          confirmation={{ yes: "next", no: "skip" }}
          type="link"
        />
        {isNotCheckinToday && (
          <Snackbar
            open={
              _.isEmpty(check) ||
              (check &&
                check.item &&
                !moment(check.item.lastCheckIn).isSame(moment(), "day"))
            }
            autoHideDuration={1500}
            style={{ zIndex: 1 }}
            // onClose={this.handleSnackBar}
          >
            <Alert onClose={this.handleSnackBar} severity="error">
              Hari ini anda belum Check In. Silahkan Check In terlebih dahulu!
            </Alert>
            {/* {alert.message} */}
          </Snackbar>
          //   <div className={`alert ${alert.type}`}>{alert.message}</div>
        )}
      </div>
    );
  }
}

function mapState(state) {
  return state;
}

const actionCreators = {
  getUsers: userActions.getAll,
  deleteUser: userActions.delete,
  getCheckin: checkActions.getCheckin,
  getAllStories: storiesActions.getAllStories,
  getAllposts: postsActions.getAllposts,
  checkin: checkActions.checkin,
  checkout: checkActions.checkout,
  addActivity: activityActions.addActivity,
  deleteActivity: activityActions.deleteActivity,
};

// Show loading when any of GET_TODOS_REQUEST, GET_USER_REQUEST is active
// const connectedHomePage = connect(mapState, actionCreators)(HomePage);
// export { connectedHomePage as HomePage };
export default compose(
  connect(
    mapState,
    // mapStateToProps,
    actionCreators // or put null here if you do not have actions to dispatch
  ),
  withStyles(styles)
)(HomePage);
