import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, Chip, createSvgIcon, FormControl, Grow, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
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

export default function Content2() {
  const classes = useStyles();

  return (
    <div>
     <Card className={classes.root + "d-flex"} variant="outlined">
                <CardHeader title="Trending #Hashtags" />
                <CardMedia />
                <CardContent>
                  <div className={classes.chips}>
                    <Chip
                      color="primary"
                      label="#TelkomAthon"
                      component="a"
                      href="telkomathon.com"
                      clickable
                    />
                    <Chip
                      color="primary"
                      label="#Programmers"
                      component="a"
                      href="telkomathon.com"
                      clickable
                    />
                    <Chip
                      color="primary"
                      label="#TimEclipseJuara"
                      component="a"
                      href="telkomathon.com"
                      clickable
                    />
                    <Chip
                      color="primary"
                      label="#AkuKuduPiye"
                      component="a"
                      href="telkomathon.com"
                      clickable
                    />
                    <Chip
                      color="primary"
                      label="#TetepSemangat"
                      component="a"
                      href="telkomathon.com"
                      clickable
                    />
                  </div>
                </CardContent>
                <CardActions></CardActions>
              </Card>
              <Card className={classes.root + "d-flex mt-4"} variant="outlined">
                <CardHeader title="You May like" />
                <CardMedia />
                <CardContent>
                  <List className={classes.root}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/1.jpg"
                        />
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
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          alt="Travis Howard"
                          src="/static/images/avatar/2.jpg"
                        />
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
                    <Divider variant="inset" component="li" />
                  </List>
                </CardContent>
                <CardActions></CardActions>
              </Card>
    </div>
  );
}

