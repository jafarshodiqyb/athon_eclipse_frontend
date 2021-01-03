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
  Divider,
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import { connect } from "react-redux";
import { userActions } from "../../store/action/user.actions";
import * as moment from "moment";
import { DialogAddEdit } from "../Dialog/DialogAddEdit";
import { useEffect, useState } from "react";
import { deepOrange } from "@material-ui/core/colors";
import { a11yProps, TabPanel } from "../Tabs/Tabs";
import  ActivityList  from "./../List/ActivtiyList";
import { MockActivityList } from "../List/MockActivity";
function ActivityCard(props) {
  const { check } = props;
  const [value, setValue] = useState(0);
  const [open,setOpen]=useState(false)
  const classes = styles();
  
 const handleCloseModal = () => {
    setOpen(false);
  };
  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Card className={classes.root + " mt-4"} variant="outlined">
        <CardHeader title="Activity" />
        <Divider/>
        <Paper square>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            indicatorColor="primary"
          >
            <Tab className={classes.tab} label="TO DO" {...a11yProps(0)} />
            <Tab className={classes.tab} label="DOING" {...a11yProps(1)} />
            <Tab className={classes.tab} label="DONE" {...a11yProps(2)} />
          </Tabs>
          <TabPanel
            style={{ maxHeight: 300, overflow: "auto" }}
            value={value}
            index={0}
          >
        <MockActivityList/>

            <ActivityList {...props} status="todo" />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ActivityList {...props} status="doing" />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ActivityList {...props} status="done" />
          </TabPanel>
          <Button
            variant="outlined"
            color="primary"
            className={classes.button + " mt-4 mb-4"}
            startIcon={<AddIcon />}
            onClick={(e) => handleOpenModal("add")}
            disabled={!check.item}
          >
            Add Activity
          </Button>
          <DialogAddEdit
            open={open}
            onClose={(e) => handleCloseModal(e)}
            type="add"
            username={props.user.username}
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
  square: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: "#D4232C",
    margin: "0 auto",
  },
}));

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
