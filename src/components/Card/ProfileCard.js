import { Avatar, Button, Card, CardActions, CardContent, IconButton, makeStyles, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { userActions } from '../../store/action/user.actions';
import { history } from '../../utils/history';

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
  photoprofile: {
    margin: "2em",
    width: "8em",
    height: "8em",
    // border:"5px solid"
  },
}));
function ProfileCard(props) {
  const classes = styles();
  const {payload} = props.authentication
  const onChange = (e) => {
    const files = e.target.files[0];
    let body = {
      id:payload?payload._id:'',
      username: payload?payload.username:'',
      image: files ? files : "",
    };
    props.updateUser(body);
  };
  return (
    <Card className={classes.root} variant="outlined" key={props.username}>
      <IconButton
        className="p-0"
        color="primary"
        aria-label="upload picture"
        onClick={()=> history.push('/profile')}
      >
        <Avatar
          src={payload ? payload.image : "person.jpg"}
          className={classes.photoprofile}
        />
      </IconButton>
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
          {payload?payload.firstName:''}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {payload?payload.job:''}
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

const connectedProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileCard);
export { connectedProfile as ProfileCard };
