import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import DeleteIcon from "@material-ui/icons/Delete";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import * as moment from "moment";
import { useState } from "react";

export function MockActivityList() {
  const [anchorEl, setAnchorEl] = useState({});
  const classes = styles();
  const handleClickAnchor = (event, id) => {
    setAnchorEl({ ...anchorEl, [id]: event.currentTarget });
  };

  const handleCloseAnchor = (id) => {
    setAnchorEl({ ...anchorEl, [id]: null });
  };
  return (
    <List className="pb-0 mb-0">
      <ListItem button>
        <Tooltip title="NDE" placement="left">
          <ListItemAvatar>
            <Avatar variant="square" className={classes.square + " mr-2"}>
              N
            </Avatar>
          </ListItemAvatar>
        </Tooltip>

        <ListItemText style={{ overflowWrap: "anywhere" }}>
          <Typography
            variant="body"
            color="textPrimary"
            className={classes.elipsis}
          >
            Undangan UAT...
          </Typography>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            style={{ width: "8em" }}
          >
            {moment("2020-12-31T23:59:00.000+00:00").format("DD/MM/YYYY HH:mm")}
          </Typography>
        </ListItemText>

        <ListItemSecondaryAction>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={(e) => handleClickAnchor(e, 1)}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl[1]}
            keepMounted
            open={anchorEl[1]}
            onClose={() => handleCloseAnchor(1)}
          >
            <MenuItem
              key={1}
              // selected={option === "Pyxis"}
              onClick={() => handleCloseAnchor(1)}
            >
              <IconButton disabled>
                <NavigateNextIcon />
              </IconButton>
            </MenuItem>
            <MenuItem
              key={1}
              // selected={option === "Pyxis"}
              onClick={() => handleCloseAnchor(1)}
            >
              <IconButton disabled>
                <DeleteIcon />
              </IconButton>
            </MenuItem>
          </Menu>
        </ListItemSecondaryAction>
      </ListItem>

      <ListItem button>
        <Tooltip title="SPPD" placement="left">
          <ListItemAvatar>
            <Avatar variant="square" className={classes.square + " mr-2"}>
              <FlightTakeoffIcon />
            </Avatar>
          </ListItemAvatar>
        </Tooltip>

        <ListItemText
        // style={{ overflowWrap: "anywhere" }}
        >
          <Typography
            variant="body"
            color="textPrimary"
            className={classes.elipsis}
          >
            SPPD New Yorkasdsadasdsad
          </Typography>
          <Typography
            variant="subtitle2"
            color="textSecondary"
            style={{ width: "8em" }}
          >
            {moment("2020-12-31T23:59:00.000+00:00").format("DD/MM/YYYY HH:mm")}
          </Typography>
        </ListItemText>

        <ListItemSecondaryAction>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={(e) => handleClickAnchor(e, 1)}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl[1]}
            keepMounted
            open={anchorEl[1]}
            onClose={() => handleCloseAnchor(1)}
          >
            <MenuItem
              key={1}
              // selected={option === "Pyxis"}
              onClick={() => handleCloseAnchor(1)}
            >
              <IconButton disabled>
                <NavigateNextIcon />
              </IconButton>
            </MenuItem>
            <MenuItem
              key={1}
              // selected={option === "Pyxis"}
              onClick={() => handleCloseAnchor(1)}
            >
              <IconButton disabled>
                <DeleteIcon />
              </IconButton>
            </MenuItem>
          </Menu>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}

const styles = makeStyles((theme) => ({
  square: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: "#D4232C",
    margin: "0 auto",
  },
  elipsis: {
    whiteSpace: "nowrap",
    minWidth: "auto",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "block",
  },
}));
