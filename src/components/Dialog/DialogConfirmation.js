import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { activityActions } from '../../store/action/activity.actions';
import { history } from '../../utils/history';

function DialogConfirmation(props) {
  const handleSubmit = () =>{
    if(props.type=='link'){
      history.push('/profile')
    } else if(props.type=='delete'){
      let body ={
        username: props.username,
        parentId : props.ids.parentId,
        childId : props.ids.childId,
      }
      props.deleteActivity(body)
      props.onClose()
    }
  }
    return (
      <Dialog {...props}>
        <DialogTitle id="form-dialog-title">{props.title?props.title:'Are you sure to perform this action?'}</DialogTitle>
        {/* Please mock your content */}
        <form id="my-form-id" onSubmit={handleSubmit}>
          <DialogContent>
            {/* <DialogContentText>{content}</DialogContentText> */}

            {/* {props.type === "delete" ? "" : form} */}
          </DialogContent>
          <DialogActions>
            <Button onClick={props.onClose} color="primary">
              {props.confirmation&&props.confirmation.no?props.confirmation.no:'No'}
            </Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              {props.confirmation&&props.confirmation.yes?props.confirmation.yes:'Yes'}
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

  deleteActivity : activityActions.deleteActivity

};

const connectedDialog = connect(mapStateToProps, mapDispatchToProps)(DialogConfirmation);
export { connectedDialog as DialogConfirmation };
