import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { userActions } from "../../store/action/user.actions";
import { Avatar, IconButton, InputAdornment, TextField, Typography, withStyles, Grid, Button, Box, Icon } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import "./login.css";
import { compose } from "redux";
import { deepOrange } from "@material-ui/core/colors";
import Copyright from "../../parts/Footer/Copyright";
import queryString from 'query-string';
 import jwt from 'jsonwebtoken'
import { createLoadingSelector } from "../../store/action/loading.selector";
const styles = (theme) => ({
    root: {
        height: '100vh',
      },
      image: {
        backgroundImage: 'url(https://tlt.co.id/assets/images/upload/20181018_151829.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
          theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
      square: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: '#D4232C',
        margin: "0 auto",
      },
      paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
        width: '50%',
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '50%',
      },
  });
class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.logout();
    this.state = {
      username: "",
      password: "",
      showPassword: false,
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    if (username && password) {
      this.props.login(username, password);
    }
  }
  googleLogIn(){
    window.open("http://localhost:3000/users/auth/google","_self");
  }
  componentDidMount(){
    if(this.props.location.pathname.length>7){
      let params = queryString.parse(this.props.location.pathname.substr(7,this.props.location.pathname.length));
      if(params.token){
        jwt.verify(params.token, '12345-67890-09876-54321', function(err, decoded) {
          if (err) {
            window.open("/login","_self")            
          } else if (decoded) {
          localStorage.setItem('token', JSON.stringify(params.token));
          window.open("/","_self")
        }
        });
      
      }     
      }
  }

  handleClickShowPassword(e) {
    this.setState({
      showPassword: !this.state.showPassword,
    });
    // setValues({ ...values, showPassword: !values.showPassword });
  }

  handleMouseDownPassword(event) {
    event.preventDefault();
  }

  render() {
    const { loggingIn } = this.props;
    const { username, password, submitted, showPassword } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <div className="container-fluid vh-100">
          <div
            className="row h-100"
            style={{ display: "flex", "flex-wrap": "wrap" }}
          >
            <div
              className={classes.image + " d-none d-sm-block col-sm-6 "}
            ></div>
            <div className="col-sm-6 col-xs-12  my-auto justify-content-center">
              <Avatar variant="square" className={classes.square}>
                D
              </Avatar>
              <Typography component="h1" variant="h5" className="mt-2">
                Login
              </Typography>
              <form name="form" onSubmit={this.handleSubmit}>
                <div
                  className={
                    "form-group w-100" +
                    (submitted && !username ? " has-error" : "")
                  }
                >
                  {/* <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                /> */}
                  {submitted && !username && (
                    <div className="help-block">Username is required</div>
                  )}
                  <TextField
                    //   variant="outlined"
                    className={classes.textField}
                    margin="normal"
                    required
                    // fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={username}
                    onChange={this.handleChange}
                    autoFocus
                  />
                </div>
                <div
                  className={
                    "form-group" + (submitted && !password ? " has-error" : "")
                  }
                >
                  {/* <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                /> */}
                  {submitted && !password && (
                    <div className="help-block">Password is required</div>
                  )}
                  <TextField
                    margin="normal"
                    required
                    // fullWidth
                    className={classes.textField}
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                    // fullWidth={true}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            onMouseDown={this.handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    // labelWidth={70}
                  />
                </div>
                <div className="form-group">
                  <Button
                    type="submit"
                    // fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    LogIn
                  </Button>
                  {/* <button className="btn btn-primary">Login</button>
                  {loggingIn && (
                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                  )}
                  <Link to="/register" className="btn btn-link">
                    Register
                  </Link> */}
                  <div className="container">
                    <div className="row">
                      <div className="col-md-3 offset-md-3 mt-2 ">
                        <Link to="#" variant="body2">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="col-md-3 mt-2">
                        <Link
                          to="/register"
                          variant="body2"
                          className="text-center"
                        >
                          {"Register"}
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="container mt-4">
                    <Button
                      variant="text"
                      size="small"
                      color="default"
                      onClick={this.googleLogIn}
                      startIcon={ <Avatar sizes="small" src="google.png"/>}
                      className="mt-4"
                    >

                      Login with Google
                    </Button>
                  </div>
                  <Box mt={5}>
                    <Copyright />
                  </Box>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // const { loggingIn } = state.authentication;
  // return { isFetching: loadingSelector(state) };
  return state
}

const mapDispatchToProps = {
  login: userActions.login,
  logout: userActions.logout,
};

// const loadingSelector = createLoadingSelector(['USER_LOGIN']);
// const mapStateToPropsToProps = (state) => ({ isFetching: loadingSelector(state) });
// export default connect(mapStateToPropsToProps)(Todos);

export default compose(
    connect(
      mapStateToProps,
      // mapStateToPropsToProps,
      mapDispatchToProps // or put null here if you do not have actions to dispatch
    ),
    withStyles(styles)
  )(LoginPage);