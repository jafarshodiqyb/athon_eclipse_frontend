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
  Avatar,
  Grow,
  CardHeader,
  TextField
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { connect } from "react-redux";
import { postsActions } from "../../store/action/post.actions";
import { useEffect } from "react";
import * as _ from 'lodash';
import * as moment from 'moment'

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
  input: {
    display: "none",
  },
  storiesWrap:{
    display: "flex",
    // justifyContent: space-around,
    maxWidth: '30em',
    position: "relative",
    overflowX: "auto",
    whiteSpace: "nowrap",
  },
  stories: {
    margin: "10px",
    width: "60px",
    height: "60px",
    // border:"5px solid"
  },
  storiesBorder: {
    border: "3px solid",
    borderColor: "#3F51B5",
  },
}));
function FeedCard(props) {
  const classes = useStyles()
  return (
    <div>
      {props.posts &&props.posts.user && props.posts.user.map((value, i) => {
        return (
          <Grow in={true}>
            <Card className={classes.root + " mt-4 mb-4"} variant="outlined">
              <CardHeader
                avatar={                    
                    <Avatar src={value.image} aria-label="recipe" className={classes.avatar}/>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={value.username}
                subheader={moment(value.lastUpdate).format("DD/MM/YYYY HH:mm")}
                className="text-left"
              />
              <CardContent>
                <Typography variant="h5" color="textPrimary" component="p" align="left">
                  {value.posts.content}
                </Typography>
              </CardContent>
              <CardMedia
                className={value.posts.image?classes.media:""}
                image={value.posts.image?value.posts.image:""}
                title={value.posts.content}
                square
              />
              <CardActions disableSpacing className="float-right">
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CardActions>
              <div className="container mb-4">
                <TextField
                  autoFocus
                  variant="outlined"
                  margin="dense"
                  id="name"
                  label="Add a comment.."
                  type="comment"
                  name="comment"
                  //   value={activity}
                  //   onChange={this.handleChange}
                  fullWidth
                />
              </div>
            </Card>
          </Grow>
        );
      })}
    </div>
  );
}

function mapStateToProps(state) {
  return state;
}
const mapDispatchToProps = {
  getAllPosts:postsActions.getAllPosts
};

const connectedProfile = connect(mapStateToProps, mapDispatchToProps)(FeedCard);
export { connectedProfile as FeedCard };
