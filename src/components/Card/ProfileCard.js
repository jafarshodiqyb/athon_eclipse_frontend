import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
  Hidden,
  IconButton,
  Avatar
} from "@material-ui/core";
import { connect } from "react-redux";
import { userActions } from "../../store/action/user.actions";
import { Link } from 'react-router-dom';
const styles = makeStyles((theme) => ({
  root: {
    width: "100%",
    //   maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    borderRadius: "50%",
    margin: "22%",
    marginTop: "10%",
    marginBottom: "10%",
  },
  input: {
    display: "none",
  },
  photoprofile:{
      margin: "2em",
      width: "8em",
      height: "8em",
      // border:"5px solid"
  }
}));
function ProfileCard(props) {
  console.log(props)
  const classes = styles();

  const onChange = (e) => {
    const files = e.target.files[0];
    let body = {
      username : props.username,
      image : files?files:''
    }
    props.updateUser(body)

  };

  // componentWillReceiveProps(nextState){
  //   if(nextState.users.items && nextState.users.items.url){
  //     let body = {
  //       username : this.state.username,
  //       image : nextState.users.items.url
  //     }
  //     this.props.updateUser(body)
  //     this.setState({
  //       image:nextState.users.items.url,
  //     })
  //     this.forceUpdate()
  //   }
  // }
  return (
    <Card className={classes.root} variant="outlined" key={props.username}>
      <IconButton
                className="p-0"
                color="primary"
                aria-label="upload picture"
                component={Link}
                to="/profile"
              >
                
                  <Avatar
                    src={props.image ? props.image : "person.jpg"}
                    className={classes.photoprofile}

                  />
              </IconButton>
      {/* <CardMedia
        className={classes.media}
        image={props.image ? props.image : "person.jpg"}
        title={props.firstName}
        key={props.username}
      /> */}
      <div hidden={props.readOnly}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        // multiple
        type="file"
        onChange={onChange}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
      </div>
      <CardContent>
        <Typography variant="h4" color="textPrimary" component="span">
          {props.firstName}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.motto}
        </Typography>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
}

function mapStateToProps(state) {
  return state;
}
const mapDispatchToProps = {
  changeImage: userActions.changeImage,
  updateUser: userActions.updateUser,
};

const connectedProfile = connect(mapStateToProps, mapDispatchToProps)(ProfileCard);
export { connectedProfile as ProfileCard };
