import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import {
  Box,
  Grid,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  createSvgIcon,
  FormControl,
  Grow,
  MenuItem,
  Select,
  TextField,
  IconButton,
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import { userActions } from "../../store/action/user.actions";
import { connect } from "react-redux";
import { PhotoCamera } from "@material-ui/icons";
import { postsActions } from "../../store/action/post.actions";
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
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    marginRight: 0,
    marginLeft: 0,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: "100%",
  },
}));

function PostFeed(props) {
  const classes = useStyles();
  
  const [data, setData] = React.useState({
        content: "",
        image: "",
    
  });
  const handlePost = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", data.image);
    let body = {
        username : props.authentication.user.username,
        image : props.user.image?props.user.image:'',
        posts : {
            content : data.content,
            image : data.image?formData:'',
            createdDate : Date()
        }
    }
    props.postFeed(body)
    setData({content:"",image:""})   
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // const()
    setData((prevState) => ({
        ...prevState,
          [name]: value,
    }));
  };

  const selectImage = (e) => {
    const files = e.target.files[0];

    setData((prevState)=>({
        ...prevState,
            image:files
    }))
  };
  return (
    <div>
      <Grow in={true}>
        <Card variant="outlined">
          <CardHeader id="form-Card-title">Add Activity</CardHeader>
          <CardContent>
            {/* <CardContentText>
            To subscribe to this website, please enter your activity address here. We will send updates
            occasionally.
          </CardContentText> */}

            <TextField
              autoFocus
              id="content"
              label="What Do You Think?"
              type="text"
              name="content"
              value={data.content}
              onChange={handleChange}
              fullWidth
            />
          </CardContent>
          <CardActions className="mb-2 d-block">
            {/* <FormControl className={classes.formControl}>
            <Select
              labelId="demo-simple-select-placeholder-label-label"
              id="demo-simple-select-placeholder-label"
              value={10}
              displayEmpty
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Public</MenuItem>
              <MenuItem value={30}>Close Friends</MenuItem>
              <MenuItem value={20}>Private</MenuItem>
            </Select>
          </FormControl> */}
          <div className="float-left mb-2">
            <input
              accept="image/*"
              className="d-none"
              id="icon-button-file-upload"
              type="file"
              onChange={selectImage}
            />
            <label htmlFor="icon-button-file-upload">
              <IconButton
                color="primary"
                aria-label="upload picture post"
                component="span"
              disabled={data.content===""}
              >
                <PhotoCamera />
              </IconButton>
            </label>
            <Typography variant="caption" color="initial">
              {data.image?data.image.name:''}
            </Typography>
          </div>
            <Button
              //   onClick={this.handleSubmit}
              variant="contained"
              color="primary"
              startIcon={<CreateIcon />}
              className="float-right mb-2"
              onClick={handlePost}
              disabled={data.content===""}
            >
              Post
            </Button>
          </CardActions>
        </Card>
      </Grow>
    </div>
  );
}
function mapStateToProps(state) {
  return state;
}

const mapDispatchToProps = {
  postFeed : postsActions.postFeed
};

const connectedPostFeed = connect(mapStateToProps, mapDispatchToProps)(PostFeed);
export { connectedPostFeed as PostFeed };
