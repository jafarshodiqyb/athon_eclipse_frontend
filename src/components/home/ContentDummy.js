import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, createSvgIcon, FormControl, Grow, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';

import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
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
      {
        content.map((value,i)=>{
          return ( 
          <Grow in={true}>

            <Card className={classes.root+ " mt-2 mb-4"}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  J
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={value.author}
              subheader={value.date}
              className="text-left"
            />
            <CardMedia
              className={classes.media}
              image={value.image}
              title={value.imageText}
              square
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {value.description}
              </Typography>
            </CardContent>
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
      
          )
        })
      }
    </div>
  );
}

const content = [
  {
    title: 'Telkom Athon',
    author:'Jafar Shodiq',
    date: 'Yesterday',
    description:
      'Hi Telkomers! Watch Eclipse Team win this telkom athon competition....',
    image: 'https://static.wixstatic.com/media/370a7e_8490be5524d94eb2b2b34ce9aa4603ef~mv2.png/v1/fill/w_1903,h_664,al_c,q_90,usm_0.66_1.00_0.01/370a7e_8490be5524d94eb2b2b34ce9aa4603ef~mv2.webp',
    imageText: 'Telkom Athon',
  },
  {
    title: 'What Programmer Participants learn?',
    author:'Jafar Shodiq',
    date: 'Yesterday',
    description:
      `Hi Telkomers! We bet you're intrigued by what TelkomAthon Programmer participants learned huh? Okay, here are our sneak peak for Programmer courses!`,
    image: 'https://static.wixstatic.com/media/a27d24_bcc2558e4f9d40419983a507ccb5d514~mv2.png/v1/fill/w_454,h_341,fp_0.50_0.50,q_90/a27d24_bcc2558e4f9d40419983a507ccb5d514~mv2.webp',
    imageText: 'Transformasi Telkom Group',
  },
  {
    title: 'Transformasi Telkom Group',
    author:'Jafar Shodiq',
    date: '2 days ago',
    description:
      'Halo Telkomers! Ingin tahu lebih lanjut tentang Transformasi TelkomGroup? Simak FAQ nya di sini!',
    image: 'https://portal.telkom.co.id/assets/s3/bglogin/7ef25991b9e9e3def7747ef04d83a481.png',
    imageText: 'Transformasi Telkom Group',
  },
];
