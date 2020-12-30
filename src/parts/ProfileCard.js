import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Link,
  makeStyles,
  Typography,
  Hidden
} from "@material-ui/core";
import { connect } from "react-redux";
import { userActions } from "../store/action/user.actions";
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
}));
function ProfileCard(props) {
  const classes = styles();

  const onChange = (e) => {
    const files = e.target.files[0];
    const formData = new FormData();
    formData.append("file", files);
    props.changeImage(formData);
  };

  return (
    <Card className={classes.root} variant="outlined" key={props.username}>
      <CardMedia
        className={classes.media}
        image={props.image ? props.image : "person.jpg"}
        title={props.firstName}
        key={props.username}
      />
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
