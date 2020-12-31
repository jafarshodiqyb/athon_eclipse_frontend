import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Link,
  makeStyles,
  Typography,
  Hidden,
  CardHeader,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  Tabs,
  Tab,
  Box,
  MenuItem,
  Menu,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ForwardIcon from "@material-ui/icons/Forward";
import AddIcon from "@material-ui/icons/Add";
import { connect } from "react-redux";
import { userActions } from "../../store/action/user.actions";
import * as moment from "moment";
import { DialogLayout } from "../DialogLayout";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MoreVertIcon from "@material-ui/icons/MoreVert";

function ActivityCard(props) {
  const classes = styles();
  const { check } = props;
  const [data, setData] = useState({
    ids: {
      parentId: "",
      childId: "",
    },
    activity: {},
    modal: {},
    modalType: "",
  });
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState({});
 
  let listActivities;
  if (check.item) {
    listActivities = check.item.activities;
  }

  const handleClickAnchor = (event, id) => {
    setAnchorEl({ ...anchorEl, [id]: event.currentTarget });
  };

  const handleCloseAnchor = (id) => {
    setAnchorEl({ ...anchorEl, [id]: null });
  };
  const handleModal = (type, activity, parentId, childId) => {
    setData({
      ...data,
      ids: {
        ...data.parentId,
        parentId: parentId,
        ...data.childId,
        childId: childId,
      },
      ...data.activity,
      activity,
      ...data.modal,
      [type]: true,
      modalType: type,
    });

  };
  const handleCloseModal = (type) => {
    setData({ ...data.modal, [type]: false });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Card className={classes.root + " mt-4"} variant="outlined">
        <CardHeader title="Activity" />
        <Paper square>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab className={classes.tab} label="TO DO" {...a11yProps(0)} />
            <Tab className={classes.tab} label="DOING" {...a11yProps(1)} />
            <Tab className={classes.tab} label="DONE" {...a11yProps(2)} />
          </Tabs>
          <TabPanel style={{ maxHeight: 300, overflow: "auto" }} value={value} index={0}>
            <List>
              {check.item &&
                listActivities.map((value, i) => {
                  return (
                    <div>
                      <ListItem
                        button
                        onClick={() =>
                          handleModal(
                            "edit",
                            value.activity,
                            check.item._id,
                            value._id
                          )
                        }
                      >
                        <ListItemText
                          primary={value.activity}
                          secondary={
                            value.createdDate
                              ? moment(value.createdDate).format(
                                  "DD/MM/YYYY HH:mm"
                                )
                              : "-"
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
                            onClick={(e) => handleClickAnchor(e, value._id)}
                          >
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            id="long-menu"
                            anchorEl={anchorEl[value._id]}
                            keepMounted
                            open={anchorEl[value._id]}
                            onClose={() => handleCloseAnchor(value._id)}
                          >
                            <MenuItem
                              key={value._id}
                              // selected={option === "Pyxis"}
                              onClick={() => handleCloseAnchor(value._id)}
                            >
                              <IconButton
                              // onClick={(e) =>
                              //   handleModal("delete", "", check.item._id, value._id)
                              // }
                              >
                                <ForwardIcon />
                              </IconButton>
                            </MenuItem>
                            <MenuItem
                              key={value._id}
                              // selected={option === "Pyxis"}
                              onClick={() => handleCloseAnchor(value._id)}
                            >
                              <IconButton
                                onClick={(e) =>
                                  handleModal(
                                    "delete",
                                    "",
                                    check.item._id,
                                    value._id
                                  )
                                }
                              >
                                <DeleteIcon />
                              </IconButton>
                            </MenuItem>
                          </Menu>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </div>
                  );
                })}
            </List>
          </TabPanel>
          <TabPanel value={value} index={1}>
            DOING
          </TabPanel>
          <TabPanel value={value} index={2}>
            DONE
          </TabPanel>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button + " mt-4 mb-4"}
            startIcon={<AddIcon />}
            onClick={(e) => handleModal("add")}
            disabled={!check.item}
          >
            Add Activity
          </Button>
          <DialogLayout
            open={data[data.modalType]}
            onClose={(e) => handleCloseModal(data.modalType)}
            type={data.modalType}
            activity={data.activity}
            username={props.user.username}
            ids={data.ids}
          />
        </Paper>
      </Card>
    </div>
  );
}
const styles = makeStyles((theme) => ({
  root: {
    width: "100%",
    //   maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    borderRadius: "50%",
    margin: "22%",
    marginTop: "10%",
    marginBottom: "10%",
  },
  input: {
    display: "none",
  },
  tab: {
    minWidth: "6em",
    width: "6em",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function mapStateToProps(state) {
  return state;
}
const mapDispatchToProps = {
  changeImage: userActions.changeImage,
  updateUser: userActions.updateUser,
};

const connectedProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityCard);
export { connectedProfile as ActivityCard };
