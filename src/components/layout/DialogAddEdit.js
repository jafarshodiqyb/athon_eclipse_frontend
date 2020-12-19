import React, { useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@material-ui/core";
import { activityActions } from "../../redux/activity.actions";
import { connect } from "react-redux";

function DialogAddEdit(props) {
    console.log(props)
    const [activityTemp, setActivityTemp] = React.useState(null);
    // useEffect(() => {
    //   setActivityTemp(props.activity)
    // });

    const handleSubmit = (e) => {
      e.preventDefault();
      const { username, modal } = props;
      let body = {
        username: username,
        activities: {
          activity: activityTemp,
        },
      };
      if (props.activity == null || props.activity =="" ) {
        props.addActivity(body);
      } else if(props.activity){
        body.parentId = props.ids.parentId
        body.childId = props.ids.childId
        props.updateActivity(body)
      }
      if (props.open) {
        handleClose();
        window.location.reload();
      }
    }
 
    const handleClose = () => {
      // setModal(false);
    };
    const handleChange = (e) =>{    
      e.preventDefault()  
      setActivityTemp(e.target.value);
    }
    return <Dialog {...props}>
          <DialogTitle id="form-dialog-title">{props.activity!=null?'Edit Activity':'Add Activity'}</DialogTitle>
    { /* Please mock your content */ }
    <form id="my-form-id" onSubmit={handleSubmit}>
                  <DialogContent>
                    <DialogContentText>
                    {props.activity!=null?`Recent Activity: ${props.activity}`:'Add your Daily activity here'}
          </DialogContentText>

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
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={props.onClose}
                      color="primary"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      variant="contained"
                      color="primary"
                    >
                      Add
                    </Button>
                  </DialogActions>
                </form>
  </Dialog>
//   <Dialog
//     open={modal}
//     onClose={this.handleModal.bind(this)}
//     aria-labelledby="form-dialog-title"
//     form="my-form-id"
//   >
//     <DialogTitle id="form-dialog-title">Add Activity</DialogTitle>
//     <form id="my-form-id" onSubmit={this.handleSubmit}>
//       <DialogContent>
//         {/* <DialogContentText>
// To subscribe to this website, please enter your activity address here. We will send updates
// occasionally.
// </DialogContentText> */}

//         <TextField
//           autoFocus
//           margin="dense"
//           id="name"
//           label="Activity"
//           type="activity"
//           name="activity"
//           value={activity}
//           onChange={this.handleChange}
//           fullWidth
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={this.handleModal.bind(this)} color="primary">
//           Cancel
//         </Button>
//         <Button onClick={this.handleSubmit} variant="contained" color="primary">
//           Add
//         </Button>
//       </DialogActions>
//     </form>
//   </Dialog>;
}
function mapState(state) {
  console.log(state);
  return state;
}
const actionCreators = {

  addActivity: activityActions.addActivity,
  updateActivity : activityActions.updateActivity,
  deleteActivity: activityActions.deleteActivity,
};

const connectedAddEdit = connect(mapState, actionCreators)(DialogAddEdit);
export { connectedAddEdit as DialogAddEdit };
// export default compose(
//   connect(
//     mapState,
//     actionCreators // or put null here if you do not have actions to dispatch
//   )
// )(DialogAddEdit);
