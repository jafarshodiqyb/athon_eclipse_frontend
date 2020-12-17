import { makeStyles, Button, withStyles } from "@material-ui/core";
import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import logo from "../../logo.svg";
import TopBar from "../layout/TopBar";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import InputIcon from '@material-ui/icons/Input';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from './../../redux/user.actions';
import {checkinActions} from '../../redux/checkin.actions';
import {checkoutActions} from '../../redux/checkout.actions';

import { compose } from "redux";

const styles = (theme) => ({
  root: {
    width: "100%",
    //   maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
});
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        const { user } = this.props;
        this.state={
            username : user.username,
        }
      }
    componentDidMount() {
        this.props.getCheckin(this.state.username)
        // this.props.getUsers()
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    checkin() {
        return (e) => this.props.checkin(this.state.username);
    }
    checkout() {
        return (e) => this.props.checkout(this.state.username);
    }

    render() {
        const { user,checkinStatus,checkoutStatus,classes } = this.props;
        console.log(this.props)
        return (
            <div>
                 <TopBar />
                 <div className="container">
        <div className="row">
          <div className="col-md-3 mt-4">
            <Card className={classes.root}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    R
                  </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
              />
              <CardMedia
                className={classes.media}
                image="/static/images/cards/paella.jpg"
                title="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  This impressive paella is a perfect party dish and a fun meal
                  to cook together with your guests. Add 1 cup of frozen peas
                  along with the mussels, if you like.
                </Typography>
              </CardContent>
              <CardActions>
                <div className="row d-block">
                  <div className="col">
                    <Button
                      variant="contained"
                      color="secondary"
                    //   className={classes.button}
                      startIcon={<InputIcon />}
                      onClick={!checkinStatus.checkin?this.checkin():this.checkout()}
                      disabled={checkinStatus.checkin && checkoutStatus.checkout}
                    >
                      {!checkinStatus.checkin?'CHECKIN':'CHECKOUT'}
                    </Button>
                  </div>
                  <div className="col">
                    <span>Last Checkin : 13.29 WIB 16 Desember 2020</span>
                  </div>
                </div>
              </CardActions>
            </Card>
          </div>
          <div className="col-md-6 mt-4">
            <List className={classes.root}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Brunch this weekend?"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        Ali Connors
                      </Typography>
                      {" — I'll be in your neighborhood doing errands this…"}
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
                  primary="Summer BBQ"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        to Scott, Alex, Jennifer
                      </Typography>
                      {" — Wish I could come, but I'm out of town this…"}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Oui Oui"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        Sandra Adams
                      </Typography>
                      {" — Do you have Paris recommendations? Have you ever…"}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </div>
        </div>
        <div className="col-md-3 mt-4"></div>
      </div>
                {/* <h1>Hi {user.firstName}!</h1>
                <p>You're logged in with React!!</p>
                <h3>All registered users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li key={user.id}>
                                {user.firstName + ' ' + user.lastName}
                                {
                                    user.deleting ? <em> - Deleting...</em>
                                    : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                    : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                                }
                            </li>
                        )}
                    </ul>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p> */}
            </div>
        );
    }
}

function mapState(state) {
    console.log(state)
    const checkinStatus = state.checkin
    const checkoutStatus = state.checkout
    const { authentication } = state;
    const { user } = authentication;
    return { user, checkinStatus,checkoutStatus };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete,
    getCheckin:checkinActions.getCheckin,
    checkin: checkinActions.checkin,
    checkout: checkoutActions.checkout,
}

// const connectedHomePage = connect(mapState, actionCreators)(HomePage);
// export { connectedHomePage as HomePage };
export default compose(
    connect(
      mapState,
      actionCreators // or put null here if you do not have actions to dispatch
    ),
    withStyles(styles)
  )(HomePage);
// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     //   maxWidth: '36ch',
//     backgroundColor: theme.palette.background.paper,
//   },
//   inline: {
//     display: "inline",
//   },
// }));
// function HomePage() {
//   const classes = useStyles();
//   const [expanded, setExpanded] = React.useState(false);

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };
//   return (
//     <div>
//       <TopBar />
//       <div className="container">
//         <div className="row">
//           <div className="col-md-3 mt-4">
//             <Card className={classes.root}>
//               <CardHeader
//                 avatar={
//                   <Avatar aria-label="recipe" className={classes.avatar}>
//                     R
//                   </Avatar>
//                 }
//                 title="Shrimp and Chorizo Paella"
//                 subheader="September 14, 2016"
//               />
//               <CardMedia
//                 className={classes.media}
//                 image="/static/images/cards/paella.jpg"
//                 title="Paella dish"
//               />
//               <CardContent>
//                 <Typography variant="body2" color="textSecondary" component="p">
//                   This impressive paella is a perfect party dish and a fun meal
//                   to cook together with your guests. Add 1 cup of frozen peas
//                   along with the mussels, if you like.
//                 </Typography>
//               </CardContent>
//               <CardActions>
//                 <div className="row d-block">
//                   <div className="col">
//                     <Button
//                       variant="contained"
//                       color="secondary"
//                     //   className={classes.button}
//                       startIcon={<InputIcon />}
//                     >
//                       CHECKIN/CHECKOUT
//                     </Button>
//                   </div>
//                   <div className="col">
//                     <span>Last Checkin : 13.29 WIB 16 Desember 2020</span>
//                   </div>
//                 </div>
//               </CardActions>
//             </Card>
//           </div>
//           <div className="col-md-6 mt-4">
//             <List className={classes.root}>
//               <ListItem alignItems="flex-start">
//                 <ListItemAvatar>
//                   <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
//                 </ListItemAvatar>
//                 <ListItemText
//                   primary="Brunch this weekend?"
//                   secondary={
//                     <React.Fragment>
//                       <Typography
//                         component="span"
//                         variant="body2"
//                         className={classes.inline}
//                         color="textPrimary"
//                       >
//                         Ali Connors
//                       </Typography>
//                       {" — I'll be in your neighborhood doing errands this…"}
//                     </React.Fragment>
//                   }
//                 />
//               </ListItem>
//               <Divider variant="inset" component="li" />
//               <ListItem alignItems="flex-start">
//                 <ListItemAvatar>
//                   <Avatar
//                     alt="Travis Howard"
//                     src="/static/images/avatar/2.jpg"
//                   />
//                 </ListItemAvatar>
//                 <ListItemText
//                   primary="Summer BBQ"
//                   secondary={
//                     <React.Fragment>
//                       <Typography
//                         component="span"
//                         variant="body2"
//                         className={classes.inline}
//                         color="textPrimary"
//                       >
//                         to Scott, Alex, Jennifer
//                       </Typography>
//                       {" — Wish I could come, but I'm out of town this…"}
//                     </React.Fragment>
//                   }
//                 />
//               </ListItem>
//               <Divider variant="inset" component="li" />
//               <ListItem alignItems="flex-start">
//                 <ListItemAvatar>
//                   <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
//                 </ListItemAvatar>
//                 <ListItemText
//                   primary="Oui Oui"
//                   secondary={
//                     <React.Fragment>
//                       <Typography
//                         component="span"
//                         variant="body2"
//                         className={classes.inline}
//                         color="textPrimary"
//                       >
//                         Sandra Adams
//                       </Typography>
//                       {" — Do you have Paris recommendations? Have you ever…"}
//                     </React.Fragment>
//                   }
//                 />
//               </ListItem>
//             </List>
//           </div>
//         </div>
//         <div className="col-md-3 mt-4"></div>
//       </div>
//     </div>
//   );
// }

// export default HomePage;
