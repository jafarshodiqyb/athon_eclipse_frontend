import React, {  useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import {
  Box,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";
import Copyright from "../../parts/Footer/Copyright";
import { userActions } from "../../store/action/user.actions";
import { connect } from "react-redux";
import { FormPassword } from "./FormPassword";
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
    marginRight: 0,
    marginLeft: 0,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: "100%",
  },
}));

function FormRegister(props) {
  const classes = useStyles();
  const [user, setUser] = React.useState({
    id:"",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    address:"",
    motto:"",
    email :"",
    job:"",
  });
  const [submitted, setSubmitted] = React.useState(false);

  useEffect(() => {
    // Update the document title using the browser API
    if (props.hide) {
      setUser((prevState) => ({
        ...prevState,
        id: props.authentication.payload._id,
        username: props.authentication.payload.username,
        firstName: props.authentication.payload.firstName,
        lastName: props.authentication.payload.lastName,
        email: props.authentication.payload.email,
        job: props.authentication.payload.job,
        address: props.authentication.payload.address,
        motto: props.authentication.payload.motto,

      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted((value) => true);
    if (
      !props.hide &&
      user.firstName &&
      user.lastName &&
      user.username &&
      user.password
    ) {
      props.register(user);
    } else {
      setUser({...user,id:props.authentication.payload._id})
      props.updateUser(user);

      // putregister
    }
  };
  var regex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)
  return (
    <div>
      <form
        name="form"
        className={classes.form + " row"}
        onSubmit={handleSubmit}
      >
         <div className={"form-group col-12"}>
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
              helperText={props.hide && !user.username && "required"}
              error={props.hide && user.username===""}
              // disabled={props.hide}
            />
          </Grid>
        </div>
        <div className={"form-group col-sm-6 col-xs-12"}>
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
              helperText={props.hide && !user.firstName && "required"}
              error={props.hide && user.firstName===""}
            //   defaultValue="tes"
            />
          </Grid>
        </div>
        <div className={"form-group col-sm-6 col-xs-12 "}>
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
              helperText={props.hide && !user.lastName && "required"}
              error={props.hide && user.lastName===""}
            />
          </Grid>
        </div>
        <div className={"form-group col-12"}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="email"
              label="Email"
              type="email"
              id="email"
              value={user.email}
              onChange={handleChange}
              helperText={
                // props.confirmPassword &&
                // props.password !== props.confirmPassword &&
                user.email&&!regex.test(user.email) &&"Email invalid"
              }
              error={
              user.email&&!regex.test(user.email)  // props.confirmPassword && props.password !== props.confirmPassword
              }
            />
          </Grid>
        </div>
        <div className={"form-group col-12"} hidden={!props.hide}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              name="job"
              label="Job"
              type="text"
              id="job"
              value={user.job}
              onChange={handleChange}
            />
          </Grid>
        </div>

        <div className={"form-group col-12"} hidden={!props.hide}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              name="address"
              label="Address"
              type="text"
              id="address"
              value={user.address}
              onChange={handleChange}
            />
          </Grid>
        </div>
        <div className={"form-group col-12"} hidden={!props.hide}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              name="motto"
              label="Motto"
              type="text"
              id="motto"
              value={user.motto}
              onChange={handleChange}
            />
          </Grid>
        </div>
       
        <FormPassword {...user} hide={props.hide} onChange={handleChange} isRegister={props.isRegister}/>
        <div className="form-group d-flex text-center justify-center col-12">
          {/* {registering && (
                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                  )} */}
          <div className="col-12">
            <Grid container justify="flex-end">
              <Grid item>
                <Typography variant="p" color="secondary">
                  *Required
                </Typography>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {props.hide ? "Change" : "Register"}
            </Button>

                <div className="col-12" hidden={props.hide}>
                  <Grid container justify="flex-end">
                    <Grid item>
                      <Link to="/login" variant="body2">
                        Already have an account? Login
                      </Link>
                    </Grid>
                  </Grid>
                </div>
                <Box mt={5} hidden={props.hide}>
                  <Copyright />
                </Box>
          </div>
        </div>
      </form>
    </div>
  );
}
function mapStateToProps(state) {
  const { registering } = state.registration;
  return { registering };
}

const mapDispatchToProps = {
  register: userActions.register,
  updateUser : userActions.updateUser
};

const connectedFormRegister = connect(mapStateToProps, mapDispatchToProps)(FormRegister);
export { connectedFormRegister as FormRegister };
