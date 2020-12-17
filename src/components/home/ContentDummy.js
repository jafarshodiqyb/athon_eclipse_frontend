import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Button, Card, CardActions, CardContent, CardHeader, createSvgIcon, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function ContentDummy() {
  const classes = useStyles();

  return (
    <div>
      <Card variant="outlined">
        <CardHeader id="form-Card-title">Add Activity</CardHeader>
        <CardContent>
          {/* <CardContentText>
            To subscribe to this website, please enter your activity address here. We will send updates
            occasionally.
          </CardContentText> */}

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="What Do You Think?"
            type="activity"
            name="activity"
            //   value={activity}
            //   onChange={this.handleChange}
            fullWidth
          />
        </CardContent>
        <CardActions className="float-right">
        <FormControl className={classes.formControl}>
          {/* <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            Age
          </InputLabel> */}
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
            </FormControl>
          <Button
            //   onClick={this.handleSubmit}
            variant="contained"
            color="primary"
            startIcon={<CreateIcon />}
          >
            Post
          </Button>
        </CardActions>
      </Card>
      <List className={classes.root}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Summer BBQ"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  to Scott, Alex, Jennifer
                </Typography>
                {" — Wish I could come, but I'm out of town this…"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Oui Oui"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Sandra Adams
                </Typography>
                {" — Do you have Paris recommendations? Have you ever…"}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </div>
  );
}
