import {
  Button,
  withStyles,
  IconButton,
  Chip,
  Paper,
  Snackbar,
  Grid,
} from "@material-ui/core";
import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import InputIcon from "@material-ui/icons/Input";
import DeleteIcon from "@material-ui/icons/Delete";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AddIcon from "@material-ui/icons/Add";
import { connect } from "react-redux";
import { userActions } from "./../../store/action/user.actions";
import { checkActions } from "./../../store/action/check.actions";
import { activityActions } from "./../../store/action/activity.actions";
import TopBar from "../../parts/TopBar";
import { DialogLayout } from "./../../parts/DialogLayout";
import { compose } from "redux";
import * as moment from "moment";
import * as _ from "lodash";
import {ContentDummy} from "./../../components/ContentDummy";
import ContentDummy2 from "./../../components/ContentDummy2";
import Copyright from "./../../parts/Copyright";
import ChatBar from "./../../parts/ChatBar";
import Alert from "@material-ui/lab/Alert";
import { ProfileCard } from "./../../parts/ProfileCard";
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import { Info, ViewColumn } from "@material-ui/icons";
import { storiesActions } from "../../store/action/stories.actions";
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
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount(){
  
    this.props.getAllStories();
  }
  componentDidMount() {
    this.props.getCheckin(this.state.user.username);
    window.scrollTo(0, 0);
  }

  handleModal(type, activity, parentId, childId) {
    // if(activity =='close')
    if (parentId && childId) {
      this.setState({
        ids: {
          parentId: parentId,
          childId: childId,
        },
      });
    }
    this.setState({
      activity: activity,
      modal: !this.state.modal,
      modalType: type,
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
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
    let listActivities;
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
    if (check.item) {
      listActivities = check.item.activities;
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

              <Card className={classes.root + " mt-4"} variant="outlined">
                <CardHeader title="Activity" />
                <Paper
                  style={{ maxHeight: 300, overflow: "auto" }}
                  elevation={0}
                >
                  <div className={classes.demo}></div>
                  <List>
                    {check.item &&
                      listActivities.map((value, i) => {
                        return (
                          <div>
                            <ListItem
                              button
                              onClick={() =>
                                this.handleModal(
                                  "edit",
                                  value.activity,
                                  check.item._id,
                                  value._id
                                )
                              }
                            >
                              <ListItemAvatar>
                                <Avatar>
                                  <AssignmentIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText
                                primary={value.activity}
                                secondary={
                                  value.createdDate
                                    ? moment(value.createdDate).format(
                                        "DD/MM/YYYY HH:mm"
                                      )
                                    : "-"
                                }
                                style={{ overflowWrap: "anywhere" }}
                              />
                              <ListItemSecondaryAction>
                                <IconButton
                                  onClick={(e) =>
                                    this.handleModal(
                                      "delete",
                                      "",
                                      check.item._id,
                                      value._id
                                    )
                                  }
                                >
                                  <DeleteIcon />
                                </IconButton>

                              </ListItemSecondaryAction>
                            </ListItem>
                          </div>
                        );
                      })}
                  </List>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button + " mb-4"}
                    startIcon={<AddIcon />}
                    onClick={(e) => this.handleModal("add")}
                    disabled={!check.item}
                  >
                    Add Activity
                  </Button>
                  <DialogLayout
                    open={modal}
                    onClose={this.handleModal.bind(this)}
                    type={modalType}
                    activity={activity}
                    username={user.username}
                    ids={ids}
                  />
                </Paper>
              </Card>
            </div>
            <div className="col-md-6 mt-4">
              <ContentDummy {...this.state} />
            </div>
            <div className="col-md-3 mt-4">
              <ContentDummy2/>
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
  return state;
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

// const connectedHomePage = connect(mapState, actionCreators)(HomePage);
// export { connectedHomePage as HomePage };
export default compose(
  connect(
    mapState,
    actionCreators // or put null here if you do not have actions to dispatch
  ),
  withStyles(styles)
)(HomePage);
