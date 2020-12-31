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
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AddIcon from "@material-ui/icons/Add";
import { connect } from "react-redux";
import { userActions } from "../../store/action/user.actions";
import * as moment from "moment";
import { DialogLayout } from "../DialogLayout";
import { useEffect, useState } from "react";

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
}));
function ActivityCard(props) {
  const classes = styles();
  const { check } = props;
  const [data, setData] = useState({
    ids: {
      parentId: "",
      childId: "",
    },
    activity: {},
    modal: false,
    modalType: "",
  });

  let listActivities;
  if (check.item) {
    listActivities = check.item.activities;
  }

  const HandleModal = (type, activity, parentId, childId) => {

      setData({
        ...data,
        ids: {
          ...data.parentId,parentId: parentId,
          ...data.childId,childId: childId,
          
        },
        ...data.activity,
        activity,
      modal: !data.modal,
      modalType: type,
      });

    console.log(data)
  };
  return (
    <Card className={classes.root + " mt-4"} variant="outlined">
      <CardHeader title="Activity" />
      <Paper style={{ maxHeight: 300, overflow: "auto" }} elevation={0}>
        <div className={classes.demo}></div>
        <List>
          {check.item &&
            listActivities.map((value, i) => {
              return (
                <div>
                  <ListItem
                    button
                    onClick={() =>
                      HandleModal(
                        "edit",
                        value.activity,
                        check.item._id,
                        value._id
                      )
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <AssignmentIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={value.activity}
                      secondary={
                        value.createdDate
                          ? moment(value.createdDate).format("DD/MM/YYYY HH:mm")
                          : "-"
                      }
                      style={{ overflowWrap: "anywhere" }}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        onClick={(e) =>
                          HandleModal("delete", "", check.item._id, value._id)
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </div>
              );
            })}
        </List>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button + " mb-4"}
          startIcon={<AddIcon />}
          onClick={(e) => HandleModal("add")}
          disabled={!check.item}
        >
          Add Activity
        </Button>
        <DialogLayout
          open={data.modal}
          onClose={(e) => HandleModal()}
          type={data.modalType}
          activity={data.activity}
          username={props.user.username}
          ids={data.ids}
        />
      </Paper>
    </Card>
  );
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
