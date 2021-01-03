import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import { userActions } from "../../store/action/user.actions";
import {
  Avatar,
  Typography,
  withStyles,
} from "@material-ui/core";
import "./register.css";
import { deepOrange, green } from "@material-ui/core/colors";
import Copyright from "../../parts/Footer/Copyright";
import {FormRegister} from "../../components/Form/FormRegister";

const styles = (theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  image: {
    backgroundImage:
      "url(https://tlt.co.id/assets/images/upload/20181018_151829.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  square: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: "#D4232C",
    margin: "0 auto",
  },
  rounded: {
    color: "#fff",
    backgroundColor: green[500],
  },
  paper: {
    marginTop: theme.spacing(8, 4),
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
    width: "100%",
  },
});
class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

   
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
    // const { registering } = this.props;
    // const { user, submitted } = this.state;
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
                <FormRegister isRegister={true} />
                {/* isi component formRegister */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { registering } = state.registration;
  return { registering };
}

const mapDispatchToProps = {
  register: userActions.register,
};

// const connectedRegisterPage = connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps // or put null here if you do not have actions to dispatch
  ),
  withStyles(styles)
)(RegisterPage);
// export { connectedRegisterPage as RegisterPage };
