import React, { useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@material-ui/core";
import { activityActions } from "../../store/action/activity.actions";
import { connect } from "react-redux";

function DialogAddEdit(props) {
    const [activityTemp, setActivityTemp] = React.useState(null);
    
    const handleSubmit = (e) => {
      e.preventDefault();
      const { username, open } = props;
      let body = {
        username: username,
        activities: {
          activity: activityTemp,
          status:props.status?props.status:'todo'
        },
      };
      props.ids? body.parentId = props.ids.parentId:body.parentId ='' 
      props.ids?body.childId = props.ids.childId:body.childId = ''
      if (props.type==='add') {
        props.addActivity(body);
      } else if(props.type==='edit'){
        props.updateActivity(body)
      }

      if (props.open) {
        handleClose();
      }
    }
 
    const handleClose = () => {
      props.onClose()
    };
    const handleChange = (e) =>{    
      e.preventDefault()  
      setActivityTemp(e.target.value);
    }
    const form = (
      <TextField
      autoFocus
      margin="dense"
      id="activityTemp"
      label="Activity"
      type="activityTemp"
      name="activityTemp"
      value={activityTemp}
      onChange={handleChange}
      fullWidth
    />
    )
    let title,content  
    if(props.type ==='edit' || props.type ==='add' ){
      title = props.activity!=null?'Edit Activity':'Add Activity'
      content = props.activity!=null?`Recent Activity: ${props.activity}`:'Add your Daily activity here'
    } 
    return (
      <Dialog {...props}>
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        {/* Please mock your content */}
        <form id="my-form-id" onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>{content}</DialogContentText>

            {props.type === "delete" ? "" : form}
          </DialogContent>
          <DialogActions>
            <Button onClick={props.onClose} color="primary">
              {props.type === "delete" ? "No" : "Cancel"}
            </Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              {props.type === "delete" ? "Yes" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
}

function mapStateToProps(state) {
  return state;
}
const mapDispatchToProps = {

  addActivity: activityActions.addActivity,
  updateActivity : activityActions.updateActivity,
  deleteActivity: activityActions.deleteActivity,
};

const connectedDialog = connect(mapStateToProps, mapDispatchToProps)(DialogAddEdit);
export { connectedDialog as DialogAddEdit };
