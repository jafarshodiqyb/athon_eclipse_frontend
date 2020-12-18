import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@material-ui/core";
import { activityActions } from "../../redux/activity.actions";
import { compose } from "redux";
import { connect } from "react-redux";

function DialogAddEdit(props) {
    console.log(props)
    const [modal, setModal] = React.useState(false);
    const handleSubmit = (e) => {
      e.preventDefault();
      const { activity, username, modal } = props;
      let body = {
        username: username,
        activities: {
          activity: activity,
        },
      };
      if (activity) {
        this.props.addActivity(body);
      }
      // if (modal) {
      //   handleClose();
      //   window.location.reload();
      // }
    }
 
    const handleClose = () => {
      setModal(false);
    };
    const handleChange = (e) =>{
      // const { name, value } = e.target;
      // this.setState({ [name]: value });
    }
    return <Dialog {...props}>
          <DialogTitle id="form-dialog-title">{props.activity!=null?'Edit Activity':'Add Activity'}</DialogTitle>
    { /* Please mock your content */ }
    <form id="my-form-id" onSubmit={handleSubmit}>
                  <DialogContent>
                    <DialogContentText>
                    {props.activity!=null?'Edit':'Add'} your Daily activity here!
          </DialogContentText>

                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Activity"
                      type="activity"
                      name="activity"
                      value={props.activity}
                      onChange={handleChange}
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={handleClose}
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
