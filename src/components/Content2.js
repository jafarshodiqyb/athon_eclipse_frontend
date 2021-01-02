import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  createSvgIcon,
  FormControl,
  Grow,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import * as _ from "lodash";
import { PongSpinner, RingSpinner } from "react-spinners-kit";
const hashtagRegex = require("hashtag-regex");
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
  chips: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function Content2(props) {
  const classes = useStyles();
  console.log(props);
  const regex = hashtagRegex();
  let match;
  let find = {};
  if(props.posts && props.posts.user){
    props.posts.user.map((value, i) => {
      while ((match = regex.exec(value.posts.content))) {
        const hashtag = match[0];
        if (!_.isEmpty(find) && find[hashtag]) {
          find[hashtag].count = find[hashtag].count + 1;
          // find[hashtag].count = find[hashtag].count++;
        } else {
          find[hashtag] = {
            hashtag: hashtag,
            count: 1,
          };
        }
      }
    });
    
  }
  let data = []
    data = _.slice(_.orderBy(_.toArray(_.forOwn(find)), ['count'], ['desc']),0,5);
  return (
    <div>
      <Card className={classes.root + "d-flex"} variant="outlined">
        <CardHeader title="Trending #Hashtags" />
        <Divider/>
        <CardContent>
          <div className={classes.chips}>
            {data &&
              data.map((value, i) => {
                return (
                  <Chip
                    color="primary"
                    label={value.hashtag}
                    component="a"
                    href="#"
                    clickable
                  />
                );
              })}
          </div>
        </CardContent>
        <CardActions></CardActions>
      </Card>
      <Card className={classes.root + "d-flex mt-4"} variant="outlined">
        <CardHeader title="You May like" />
        <Divider/>
        <CardContent>
          <List className={classes.root}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Amoeba"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    ></Typography>
                    {"12034 Likes"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Telkom Athon"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    ></Typography>
                    {"12334 Likes"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider component="li" />
          </List>
        </CardContent>
        <CardActions></CardActions>
      </Card>

      <Card className={classes.root + "d-flex mt-4"} variant="outlined">
        <div className="mt-4 mb-4">
        <div style={{position:"relative",display:"flex"}}>
        <SpinnerWrapper>
          <RingSpinner  className="ml-2" size={25} color="#D4232C" loading={true} />
        </SpinnerWrapper>
        <Typography
          // component="span"
          variant="h5"
          className={classes.inline + " ml-2"}
          color="textPrimary"
        >
          Breaking News
        </Typography>
        </div>
        </div>
        <Divider component="li" />
        <List className={classes.root}>
          <ListItem alignItems="flex-start" button>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Tim Eclipse juara 1 Telkom Athon"
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  ></Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Telkom Athon Batch 1 Selesai"
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  ></Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </Card>
    </div>
  );
}

const SpinnerWrapper = ({ children}) => {
  return (
      <div style={{ position:"relative"}} className="ml-3 mt-1">
          {children}
          
      </div>
  );
};