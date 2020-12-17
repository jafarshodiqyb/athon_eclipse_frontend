import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { userActions } from "../../redux/user.actions";
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import "./register.css";
import { deepOrange, green } from "@material-ui/core/colors";
import { compose } from "redux";
import Copyright from "../layout/Copyright";
const styles = (theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  square: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    margin: "0 auto",
  },
  rounded: {
    color: "#fff",
    backgroundColor: green[500],
  },
  paper: {
    marginTop: theme.spacing(8,4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: '100%'
  },
});
class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
      },
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    if (user.firstName && user.lastName && user.username && user.password) {
      this.props.register(user);
    }
  }

  render() {
    const { registering } = this.props;
    const { user, submitted } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <div className="container-fluid vh-100">
          <div
            className="row h-100"
            style={{ display: "flex", "flex-wrap": "wrap" }}
          >
            <div className="col-md-6 bg"></div>
            <div className="col-md-6 my-auto text-center">
              <div className="container">

              <div className="row">
                <div className="col-12">
              <Avatar variant="square" className={classes.square}>
                D
              </Avatar>

                </div>
                <div className="col-12">
              <Typography component="h1" variant="h5" className="mt-2">
                Register
              </Typography>
                </div>
              </div>
              <form
                name="form"
                className={classes.form + " row"}
                onSubmit={this.handleSubmit}
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
                      onChange={this.handleChange}
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
                      onChange={this.handleChange}
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
                      onChange={this.handleChange}
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
                      onChange={this.handleChange}
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
                    Sign Up
                  </Button>
                  <div className="col-12">
                  <Grid container justify="flex-end">
                    <Grid item>
                      <Link to="/login" variant="body2">
                        Already have an account? Sign in
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

            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  const { registering } = state.registration;
  return { registering };
}

const actionCreators = {
  register: userActions.register,
};

// const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export default compose(
  connect(
    mapState,
    actionCreators // or put null here if you do not have actions to dispatch
  ),
  withStyles(styles)
)(RegisterPage);
// export { connectedRegisterPage as RegisterPage };
