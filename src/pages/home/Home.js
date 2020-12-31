import {
  Button,
  withStyles,
  Snackbar,
} from "@material-ui/core";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import InputIcon from "@material-ui/icons/Input";
import { connect } from "react-redux";
import { userActions } from "./../../store/action/user.actions";
import { checkActions } from "./../../store/action/check.actions";
import { activityActions } from "./../../store/action/activity.actions";
import TopBar from "../../parts/Header/TopBar";
import { compose } from "redux";
import * as moment from "moment";
import * as _ from "lodash";
import {Content} from "./../../components/Content";
import Content2 from "./../../components/Content2";
import Copyright from "./../../parts/Footer/Copyright";
import ChatBar from "./../../parts/ChatBar/ChatBar";
import Alert from "@material-ui/lab/Alert";
import { ProfileCard } from "../../components/Card/ProfileCard";
import { ActivityCard } from "../../components/Card/ActivityCard";
import { storiesActions } from "../../store/action/stories.actions";
import  {createLoadingSelector}  from "../../store/action/loading.selector";
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
      user: data.authentication.user,
      modal: false,
      modalType: "",
      activity: null,
      ids: {
        parentId: "",
        childId: "",
      },
    };
  }
  componentWillMount(){
    this.props.getAllStories();
    this.forceUpdate()
  }
  componentDidMount() {
    this.props.getCheckin(this.state.user.username);
    window.scrollTo(0, 0);
  }

 

  checkin() {
    return (e) => this.props.checkin(this.state.user.username);
  }
  checkout() {
    return (e) => this.props.checkout(this.state.user.username);
  }

  render() {
    const { check, classes } = this.props;
    const { user, modal, activity, ids, modalType } = this.state;
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


    return (
      <div>
        {(_.isEmpty(check) ||
          (check &&
            check.item &&
            !moment(check.item.lastCheckIn).isSame(moment(), "day"))) && (
          <Snackbar
            open={
              _.isEmpty(check) ||
              (check &&
                check.item &&
                !moment(check.item.lastCheckIn).isSame(moment(), "day"))
            }
            autoHideDuration={1500}
            // onClose={this.handleSnackBar}
          >
            <Alert onClose={this.handleSnackBar} severity="error">
              Hari ini anda belum Check In. Silahkan Check In terlebih dahulu!
            </Alert>
            {/* {alert.message} */}
          </Snackbar>
          //   <div className={`alert ${alert.type}`}>{alert.message}</div>
        )}
        <TopBar />
        <div className="container">
          <div className="row">
            <div className="col-md-3 mt-4">
              <ProfileCard {...user} readOnly={true} />
              <Card className={ " mt-4"} variant="outlined">
                <div className="pl-4 pt-2">
                  <Typography component="h6" variant="h6" align="left" >
                    {title}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary" align="left" >
                      {date}
                    </Typography>
                </div>
                    {/* <InfoTitle>50 Days of Premium!</InfoTitle>
                    <InfoSubtitle>Get it before 01.01.2020</InfoSubtitle> */}
                    <div className="float-right pr-2 pb-2 mt-2">
                    <Button
                      variant="outlined"
                      color="secondary"
                      className={classes.button}
                      startIcon={<InputIcon />}
                      size="small"
                      onClick={
                        _.isEmpty(check) ||
                        (check &&
                          check.item &&
                          !moment(check.item.lastCheckIn).isSame(
                            moment(),
                            "day"
                          ))
                          ? this.checkin()
                          : this.checkout()
                      }
                      disabled={
                        check.item &&
                        moment(check.item.lastCheckIn).isSame(
                          moment(),
                          "day"
                        ) &&
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

              
              <ActivityCard {...this.state}/>
            </div>
            <div className="col-md-6 mt-4">
              <Content {...this.state} />
            </div>
            <div className="col-md-3 mt-4">
              <Content2/>
            </div>
          </div>
        </div>
        <ChatBar />
        <Copyright />
      </div>
    );
  }
}

function mapState(state) {
  state.isFetching = loadingSelector(state)
  return state
}

const actionCreators = {
  getUsers: userActions.getAll,
  deleteUser: userActions.delete,
  getCheckin: checkActions.getCheckin,
  getAllStories: storiesActions.getAllStories,
  checkin: checkActions.checkin,
  checkout: checkActions.checkout,
  addActivity: activityActions.addActivity,
  deleteActivity: activityActions.deleteActivity,
};

// Show loading when any of GET_TODOS_REQUEST, GET_USER_REQUEST is active
const loadingSelector = createLoadingSelector(['STORIES_GETSTORIES', 'CHECKIN_GETCHECKIN']);
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
