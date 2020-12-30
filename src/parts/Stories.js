import React, { useEffect } from "react";
import {
  Avatar,
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import { activityActions } from "../store/action/activity.actions";
import { connect } from "react-redux";
import ReactInstaStories from "react-insta-stories";

const image = {
  display: "block",
  maxWidth: "100%",
  borderRadius: 4,
};

const code = {
  background: "#eee",
  padding: "5px 10px",
  borderRadius: "4px",
  color: "#333",
};

const contentStyle = {
  // background: 'salmon',
  width: "100%",
  padding: 20,
  color: "white",
};

const SmallAvatar = withStyles((theme) => ({
  root: {
    width: 15,
    height: 15,
    // border: `2px solid ${theme.palette.background.paper}`,
  },
}))(Avatar);

function Stories(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
  const addStory = () => {
    alert("tes");
  };
  const stories = props.userStories.stories.map((value, i) => {
    return {
      content: ({ action, isPaused }) => {
        return (
          <div
            style={{ backgroundImage: `url(${value.url})`, ...contentStyle }}
            className="w-100"
          >
            <div className="d-flex">
              <IconButton
                className="p-0"
                onClick={addStory}
                key={i}
                style={{ zIndex: 1000 }}
                disabled={
                  props.userStories.username !==
                  props.authentication.user.username
                }
              >
                <Badge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  badgeContent={
                    props.userStories.username ===
                      props.authentication.user.username && (
                      <SmallAvatar alt="Add" src="add-icon.png" />
                    )
                  }
                >
                  <Avatar src={props.userStories.image} />
                </Badge>
              </IconButton>
              <Typography variant="h6" color="initial" className="mt-1 ml-2">
                {props.userStories.username}
              </Typography>
            </div>
            {/* <h1>{ }</h1> */}
            <p>Now render React components right into your stories.</p>
            <p>Possibilities are endless, like here - here's a code block!</p>
            <pre>
              <code style={code}>console.log('Hello, world!')</code>
            </pre>
            <p>Or here, an image!</p>
            <br />
            <img
              style={image}
              src="https://images.unsplash.com/photo-1565506737357-af89222625ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
            ></img>
            <h3>Perfect. But there's more! →</h3>
          </div>
        );
      },
    };
  });
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <ReactInstaStories
        // stories={props.userStories.stories}
        loop
        stories={stories}
        defaultInterval={1500}
        width={432}
        height={768}
        onAllStoriesEnd={handleClose}
        keyboardNavigation={true}
        // onStoryEnd={(s, st) => console.log('story ended', s, st)}
      />
    </Dialog>
  );
}

function mapStateToProps(state) {
  return state;
}
const mapDispatchToProps = {
  addActivity: activityActions.addActivity,
  updateActivity: activityActions.updateActivity,
  deleteActivity: activityActions.deleteActivity,
};

const connectedDialog = connect(mapStateToProps, mapDispatchToProps)(Stories);
export { connectedDialog as Stories };
