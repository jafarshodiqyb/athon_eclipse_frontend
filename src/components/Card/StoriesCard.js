import { Avatar, Badge, Card, IconButton, makeStyles, Typography, withStyles } from "@material-ui/core";
import { useState } from "react";
import Stories from "../../parts/Stories/Stories";

export function StoriesFeed(props) {
    const classes = useStyles();
    const [modalOpen, setModalOpen] = useState({});
    const findMyStories = (props && props.stories && props.stories.user)?  props.stories.user.filter((value,i)=>{
      return value.user.username === props.authentication.payload.username
    }):[]
    const handleClickOpen = (username) => {
      if(findMyStories.length>0 ||username !==props.authentication.payload.username){
        setModalOpen({ ...modalOpen, [username]: true });
      }
    };
  
    const handleClose = (username) => {
      setModalOpen({ ...modalOpen, [username]: false });
    };
  
    const onChange = (e) => {
      e.preventDefault();
      const files = e.target.files[0];
        let body = {
          user : props.authentication.payload._id,
          image : props.user.image?props.user.image:'',
          stories:{
            image:files?files:'',
            url:'',
            storiesDate:Date()
          }
        }
        props.postStories(body)
        handleClose(props.authentication.payload.username)
    };
    return(

    <Card variant="outlined" className={" mb-4"}>
    <div className={classes.storiesWrap + " float-left"}>
      <div style={{ display: "inline-grid" }}>
        <input
          accept="image/*"
          className={classes.input}
          id="icon-button-file"
          type="file"
          onChange={onChange}
        />
        <label
          htmlFor={findMyStories.length <= 0 ? "icon-button-file" : ""}
          style={{ display: "flex", marginBottom: 0 }}
        >
          <IconButton
            className="p-0"
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={() => handleClickOpen(props.user.username)}
          >
            <Badge
              overlap="circle"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              badgeContent={
                findMyStories.length <= 0 ? (
                  <SmallAvatar alt="Add" src="add-icon.png" />
                ) : (
                  ""
                )
              }
            >
              <Avatar
                src={props.user && props.user.image ? props.user.image : "person.jpg"}
                className={[classes.stories, (findMyStories.length <= 0?" ":classes.storiesBorder)]}

              />
            </Badge>
          </IconButton>
        </label>

        <Typography variant="caption" color="initial" className="mb-2">
          {props.user.username}
        </Typography>
      </div>
      {props &&
        props.stories &&
        props.stories.user &&
        props.stories.user.map((value, i) => {
          return (
            <div
              style={{ display: "inline-grid" }}
              key={i}
              hidden={value.user.username === props.user.username}
            >
              <IconButton
                className="p-0"
                onClick={() => handleClickOpen(value.user.username)}
                key={i}
              >
                <Avatar
                  src={value.image ? value.image : "person.jpg"}
                  className={[classes.stories, classes.storiesBorder]}
                />
              </IconButton>
              <Typography variant="caption" color="initial" className="mb-2">
                {value.user.username}
              </Typography>
              <Stories
                open={modalOpen[value.user.username]}
                onClose={() => handleClose(value.user.username)}
                userStories={value}
              />
            </div>
          );
        })}
    </div>
  </Card>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline",
    },
    media: {
      height: 0,
      paddingTop: "56.25%",
    },
    input: {
      display: "none",
    },
    storiesWrap:{
      display: "flex",
      minWidth: '35em',
      position: "relative",
      overflowX: "auto",
      whiteSpace: "nowrap",
    },
    stories: {
      margin: "10px",
      width: "60px",
      height: "60px",
    },
    storiesBorder: {
      border: "3px solid",
      borderColor: "#3F51B5",
    },
  }));
  
  const SmallAvatar = withStyles((theme) => ({
    root: {
      width: 22,
      height: 22,
      border: `2px solid ${theme.palette.background.paper}`,
    },
  }))(Avatar);