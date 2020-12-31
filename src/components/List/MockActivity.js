import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, makeStyles, Menu, MenuItem, Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ForwardIcon from "@material-ui/icons/Forward";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useState } from "react";
import * as  moment  from "moment";
import { deepOrange } from "@material-ui/core/colors";
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
export function MockActivityList(){
  const [anchorEl, setAnchorEl] = useState({});
    const classes = styles()
    const handleClickAnchor = (event, id) => {
        setAnchorEl({ ...anchorEl, [id]: event.currentTarget });
      };
    
      const handleCloseAnchor = (id) => {
        setAnchorEl({ ...anchorEl, [id]: null });
      };
    return (
        <List>
             <ListItem button>
            <Tooltip title="NDE" placement="left">
                  <ListItemAvatar style={{ marginLeft: "-2em" }}>
                    <Avatar
                      variant="square"
                      className={classes.square + " mr-2"}
                    >
                        N
                    </Avatar>
                  </ListItemAvatar>
            </Tooltip>

                  <ListItemText
                    primary="Undangan UAT..."
                    secondary={
                       moment('2020-12-31T23:59:00.000+00:00').format("DD/MM/YYYY HH:mm")
                        
                    }
                    style={{ overflowWrap: "anywhere" }}
                  />

                  <ListItemSecondaryAction
                    style={{ display: "flex", left: "10em" }}
                  >
                    <IconButton
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={(e) => handleClickAnchor(e,1)}
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
                        <IconButton
                        disabled
                        >
                          <ForwardIcon />
                        </IconButton>
                      </MenuItem>
                      <MenuItem
                        key={1}
                        // selected={option === "Pyxis"}
                        onClick={() => handleCloseAnchor(1)}
                      >
                        <IconButton
                         disabled
                        >
                          <DeleteIcon />
                        </IconButton>
                      </MenuItem>
                    </Menu>
                  </ListItemSecondaryAction>
                </ListItem>

                <ListItem button>
            <Tooltip title="SPPD" placement="left">
                  <ListItemAvatar style={{ marginLeft: "-2em" }}>
                    <Avatar
                      variant="square"
                      className={classes.square + " mr-2"}
                    >
                      <FlightTakeoffIcon/>
                    </Avatar>
                  </ListItemAvatar>
            </Tooltip>

                  <ListItemText
                    primary="SPPD New York"
                    secondary={
                       moment('2020-12-31T23:59:00.000+00:00').format("DD/MM/YYYY HH:mm")
                        
                    }
                    style={{ overflowWrap: "anywhere" }}
                  />

                  <ListItemSecondaryAction
                    style={{ display: "flex", left: "10em" }}
                  >
                    <IconButton
                      aria-label="more"
                      aria-controls="long-menu"
                      aria-haspopup="true"
                      onClick={(e) => handleClickAnchor(e,1)}
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
                        <IconButton
                        disabled
                        >
                          <ForwardIcon />
                        </IconButton>
                      </MenuItem>
                      <MenuItem
                        key={1}
                        // selected={option === "Pyxis"}
                        onClick={() => handleCloseAnchor(1)}
                      >
                        <IconButton
                         disabled
                        >
                          <DeleteIcon />
                        </IconButton>
                      </MenuItem>
                    </Menu>
                  </ListItemSecondaryAction>
                </ListItem>

                
                

        </List>
    )
}

const styles = makeStyles((theme) => ({

    square: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: '#D4232C',
      margin: "0 auto",
    },
  }));