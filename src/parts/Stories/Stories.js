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
  makeStyles,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import { activityActions } from "../../store/action/activity.actions";
import { connect } from "react-redux";
import ReactInstaStories from "react-insta-stories";
import { compose } from "redux";

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
  // width: "100%",
  padding: 20,
  color: "white",
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  backgroundPosition: "center",
};

const SmallAvatar = withStyles((theme) => ({
  root: {
    width: 15,
    height: 15,
    // border: `2px solid ${theme.palette.background.paper}`,
  },
}))(Avatar);

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
    zIndex:1001,
    position: "absolute"
  },
}));

function Stories(props) {
  const classes = useStyles()
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
  // const addStory = () => {
  //   alert("tes");
  // };
  const onChange = () => {
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
            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={onChange}  />
            <label htmlFor={props.userStories.username ===
                  props.authentication.payload.username?"icon-button-file":''} style={{display:'flex',marginBottom:0}}>
            
              <IconButton
                className="p-0"
                aria-label="upload picture" 
                component="span"
                // onClick={addStory}
                key={i}
                style={{ zIndex: 1000 }}
                disabled={
                  props.userStories.username !==
                  props.authentication.payload.username
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
                      props.authentication.payload.username && (
                      <SmallAvatar alt="Add" src="add-icon.png" />
                    )
                  }
                >
                  <Avatar src={props.userStories.image} />
                </Badge>
              </IconButton>
            </label>
              <Typography variant="h6" color="initial" className="mt-1 ml-2">
                {props.userStories.username}
              </Typography>
            </div>
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
        // onAllStoriesEnd={handleClose}
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

// const connectedDialog = connect(mapStateToProps, mapDispatchToProps)(Stories);
// export { connectedDialog as Stories };
export default compose(
  connect(
    mapStateToProps,
    // mapStateToProps,
    mapDispatchToProps// or put null here if you do not have actions to dispatch
  ),
  withStyles(useStyles)
)(Stories);
