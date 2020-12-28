import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import {
  Box,
  Grid,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  createSvgIcon,
  FormControl,
  Grow,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  withStyles,
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";

import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Copyright from "./../parts/Copyright";
import { userActions } from "./../store/action/user.actions";
import { connect } from "react-redux";
import { compose } from "redux";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: "100%",
  },
}));

function FormRegister(props) {
  const classes = useStyles();
  const [user, setUser] = React.useState({
      firstName: "",
      lastName: "",
      username: "",
      password: "",
  });
  const [submitted, setSubmitted] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(value => true);
    if (user.firstName && user.lastName && user.username && user.password) {
      props.register(user);
    }
  };
  return (
    <div>
      <form
        name="form"
        className={classes.form + " row"}
        onSubmit={handleSubmit}
      >
        <div
          className={
            "form-group col-sm-6 col-xs-12" +
            (submitted && !user.firstName ? " has-error" : "")
          }
        >
          <Grid item xs={12} sm={6} className="name">
            <TextField
              autoComplete="fname"
              name="firstName"
              value={user.firstName}
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              onChange={handleChange}
              autoFocus
            />
          </Grid>
          {submitted && !user.firstName && (
            <div className="help-block">First Name is required</div>
          )}
        </div>
        <div
          className={
            "form-group col-sm-6 col-xs-12 " +
            (submitted && !user.lastName ? " has-error" : "")
          }
        >
          <Grid item xs={12} sm={6} className="name">
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              autoComplete="lname"
            />
          </Grid>
          {submitted && !user.lastName && (
            <div className="help-block">Last Name is required</div>
          )}
        </div>
        <div
          className={
            "form-group col-12" +
            (submitted && !user.username ? " has-error" : "")
          }
        >
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="username"
              value={user.username}
              onChange={handleChange}
              id="username"
              label="Username "
              name="username"
              autoComplete="username"
            />
          </Grid>
          {submitted && !user.username && (
            <div className="help-block">Username is required</div>
          )}
        </div>
        <div
          className={
            "form-group col-12" +
            (submitted && !user.password ? " has-error" : "")
          }
        >
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
          </Grid>
          {submitted && !user.password && (
            <div className="help-block">Password is required</div>
          )}
        </div>
        <div className="form-group d-flex text-center justify-center col-12">
          {/* {registering && (
                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                  )} */}
          <div className="col-12">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>
            <div className="col-12">
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to="/login" variant="body2">
                    Already have an account? Login
                  </Link>
                </Grid>
              </Grid>
            </div>
            <Box mt={5}>
              <Copyright />
            </Box>
          </div>
        </div>
      </form>
    </div>
  );
}
function mapState(state) {
  const { registering } = state.registration;
  return { registering };
}

const actionCreators = {
  register: userActions.register,
};

const connectedFormRegister = connect(mapState, actionCreators)(FormRegister);
export { connectedFormRegister as FormRegister };
