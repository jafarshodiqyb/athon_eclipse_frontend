import {
  Button,
  withStyles,
  IconButton,
  Chip,
  Paper,
  Snackbar,
} from "@material-ui/core";
import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TopBar from "../layout/TopBar";
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
import { userActions } from "./../../redux/user.actions";
import { checkActions } from "../../redux/check.actions";
import { activityActions } from "../../redux/activity.actions";
import { DialogAddEdit } from "./../layout/DialogAddEdit";
import { compose } from "redux";
import * as moment from "moment";
import * as _ from "lodash";
import ContentDummy from "./ContentDummy";
import Copyright from "./../layout/Copyright"
import ChatBar from "./ChatBar";
import Alert from "@material-ui/lab/Alert";
const styles = (theme) => ({
  root: {
    width: "100%",
    //   maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  chips: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
});
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    const data = this.props;
    this.state = {
      username: data.authentication.user.username,
      firstName: data.authentication.user.firstName,
      lastName: data.authentication.user.lastName,

      modal: false,
      activity: null,
      ids : {
        parentId :'',
        childId :'',
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.props.getCheckin(this.state.username);
    // if(_.isEmpty(this.props.check)){
    //   console.log(_.isEmpty(this.props.check));
    // }
      window.scrollTo(0, 0)
    // this.props.getUsers()
  }

  handleModal(activity,parentId, childId) {
    // if(activity =='close')
    if (parentId && childId){
      this.setState({
        ids : {
          parentId : parentId,
          childId : childId,
        }
      })
    }
    this.setState({
      activity: activity,
      modal: !this.state.modal,
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleDelete(parentId, childId) {
    let body = {
      parentId: parentId,
      childId: childId,
    };
    this.props.deleteActivity(body);

  }

  checkin() {
    return (e) => this.props.checkin(this.state.username);
  }
  checkout() {
    return (e) => this.props.checkout(this.state.username);
  }

  render() {
    const { check, classes } = this.props;
    const { username, firstName, lastName, modal, activity,ids } = this.state;
    let listActivities;
    let title, date;
    if (
      (check.item &&
        (check.item.lastCheckOut===null||(!moment(check.item.lastCheckOut).isSame(moment(), 'day')) && moment(check.item.lastCheckIn).isSame(moment(), 'day')))
    ) {
      title = "Last Check In";
      date = moment(check.item.lastCheckIn).format("DD/MM/YYYY HH:mm");
    } else if (check.item && (check.item.lastCheckOut||!moment(check.item.lastCheckIn).isSame(moment(), 'day') && !moment(check.item.lastCheckOut).isSame(moment(), 'day') )) {
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
        {(_.isEmpty(check) || (check && check.item && !moment(check.item.lastCheckIn).isSame(moment(), 'day'))) && (
          <Snackbar
            open={(_.isEmpty(check) || (check && check.item && !moment(check.item.lastCheckIn).isSame(moment(), 'day')))}
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
              <Card className={classes.root} variant="outlined">
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      {firstName.charAt(0)}
                    </Avatar>
                  }
                  title={firstName}
                  subheader={username}
                  className="text-left"
                />
                <CardMedia
                  className={classes.media}
                  image="/static/images/cards/paella.jpg"
                  title="Paella dish"
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s.
                  </Typography>
                </CardContent>
                <CardActions>
                  <div className="container">
                    <div className="row d-block">
                      <div className="col-12">
                        <Button
                          variant="contained"
                          color="secondary"
                            className={classes.button}
                          startIcon={<InputIcon />}
                          onClick={
                            (_.isEmpty(check) || (check && check.item && !moment(check.item.lastCheckIn).isSame(moment(), 'day'))) ? this.checkin() : this.checkout()
                          }
                          disabled={
                            (check.item &&(
                            (moment(check.item.lastCheckIn).isSame(moment(), 'day') &&
                            moment(check.item.lastCheckOut).isSame(moment(), 'day'))))
                          }
                        >
                          {(_.isEmpty(check) || (check && check.item && !moment(check.item.lastCheckIn).isSame(moment(), 'day')))  ? "CHECKIN" : "CHECKOUT"}
                        </Button>
                      </div>
                      <div className="col mt-4">
                        <div className="row ">
                          <div className="col-12 align-middle">
                            <span>{title}</span>
                          </div>
                          <div className="col-12">
                            <small className="">{date}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={classes.demo}></div>
                </CardActions>
              </Card>
              <Card className={classes.root + " mt-4"} variant="outlined">
              <CardHeader title="Activity" />
              <Paper  style={{maxHeight: 300, overflow: 'auto'}} elevation={0}>
              <List>
                {check.item &&
                  listActivities.map((value, i) => {
                    return (
                      <div>
                        <ListItem
                          button
                          onClick={() => this.handleModal(value.activity,check.item._id, value._id)}
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
                            style={{'overflowWrap':'anywhere'}}
                          />
                          <ListItemSecondaryAction>
                            <IconButton
                              onClick={(e) =>
                                this.handleDelete(check.item._id, value._id)
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                            {/* </Menu> */}
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
                onClick={(e) => this.handleModal(null)}
              >
                Add Activity
              </Button>
              <DialogAddEdit
                open={modal}
                onClose={this.handleModal.bind(this)}
                activity={activity}
                username={username}
                ids={ids}
              />
              </Paper >
              </Card>
            </div>
            <div className="col-md-6 mt-4">
              <ContentDummy />
            </div>
            <div className="col-md-3 mt-4">
              <Card className={classes.root + "d-flex"} variant="outlined">
                <CardHeader title="Trending #Hashtags" />
                <CardMedia />
                <CardContent>
                  <div className={classes.chips}>
                    <Chip
                      color="primary"
                      label="#TelkomAthon"
                      component="a"
                      href="telkomathon.com"
                      clickable
                    />
                    <Chip
                      color="primary"
                      label="#Programmers"
                      component="a"
                      href="telkomathon.com"
                      clickable
                    />
                    <Chip
                      color="primary"
                      label="#TimEclipseJuara"
                      component="a"
                      href="telkomathon.com"
                      clickable
                    />
                    <Chip
                      color="primary"
                      label="#AkuKuduPiye"
                      component="a"
                      href="telkomathon.com"
                      clickable
                    />
                    <Chip
                      color="primary"
                      label="#TetepSemangat"
                      component="a"
                      href="telkomathon.com"
                      clickable
                    />
                  </div>
                </CardContent>
                <CardActions></CardActions>
              </Card>
              <Card className={classes.root + "d-flex mt-4"} variant="outlined">
                <CardHeader title="You May like" />
                <CardMedia />
                <CardContent>
                  <List className={classes.root}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/1.jpg"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary="Amoeba"
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              className={classes.inline}
                              color="textPrimary"
                            ></Typography>
                            {"12034 Likes"}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          alt="Travis Howard"
                          src="/static/images/avatar/2.jpg"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary="Telkom Athon"
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              className={classes.inline}
                              color="textPrimary"
                            ></Typography>
                            {"12334 Likes"}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </List>
                </CardContent>
                <CardActions></CardActions>
              </Card>
            </div>
          </div>
        </div>
        <ChatBar/>
        <Copyright/>
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
