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
import ContentDummy from "./../../components/ContentDummy";
import Copyright from "./../../parts/Copyright"
import ChatBar from "./../../parts/ChatBar";
import Alert from "@material-ui/lab/Alert";
import {FormRegister} from "./../../components/FormRegister"
import { MoreVert as MoreVertIcon } from '@material-ui/icons'
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
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
      borderRadius: '50%',
      margin: '22%',
      marginTop:'10%',
      marginBottom:'10%',
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
    };

  }

  render() {
    const { check, classes } = this.props;
    const { username, firstName, lastName } = this.state;
    return (
      <div>
        <TopBar />
        <div className="container">
          <div className="row">
            <div className="col-md-4 mt-4">
              <Card className={classes.root} variant="outlined">
                <CardMedia
                  className={classes.media}
                  image="person.jpg"
                  title={firstName}
                />
                <CardContent>
                  <Typography
                    variant="h4"
                    color="textPrimary"
                    component="p"
                  >
                    {username}
                  </Typography>
                </CardContent>
                <CardActions>

                </CardActions>
              </Card>
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

function mapState(state) {
  return state;
}

const actionCreators = {

};

// const connectedHomePage = connect(mapState, actionCreators)(HomePage);
// export { connectedHomePage as HomePage };
export default compose(
  connect(
    mapState,
    actionCreators // or put null here if you do not have actions to dispatch
  ),
  withStyles(styles)
)(Profile);
