import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grow,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';
import * as moment from 'moment';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import ReactHashtag from "react-hashtag";
import { postsActions } from '../../store/action/post.actions';
import { Link } from 'react-router-dom';

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
}));
function FeedCard(props) {
  const classes = useStyles()
  console.log(props)
  // if(props.query)
  return (
    <div>
      {props.posts &&props.posts.user && props.posts.user.map((value, i) => {
        return (
          <Grow in={true}>
            <Card className={classes.root + " mt-4 mb-4"} variant="outlined">
              <CardHeader
                avatar={
                  <Avatar
                    src={value.user.image ? value.user.image : "person.jpg"}
                    aria-label="recipe"
                    className={classes.avatar}
                  />
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={value.user.username}
                subheader={moment(value.lastUpdate).fromNow()}
                className="text-left"
              />
              <CardContent>
                <Typography
                  variant="h5"
                  color="textPrimary"
                  component="p"
                  align="left"
                >
                  <ReactHashtag
                    renderHashtag={(hashtagValue) => (
                      <Typography variant="h5" className="d-inline">
                        <Link to={`/${hashtagValue}`} >
                          {hashtagValue}
                        </Link>
                      </Typography>
                      // <Link className="hashtag">{hashtagValue}</div>
                    )}
                  >
                    {value.posts.content}
                  </ReactHashtag>
                </Typography>
              </CardContent>
              <CardMedia
                className={value.posts.image ? classes.media : ""}
                image={value.posts.image ? value.posts.image : ""}
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
