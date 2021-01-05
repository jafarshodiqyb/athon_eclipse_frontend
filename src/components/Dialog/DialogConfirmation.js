import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { activityActions } from '../../store/action/activity.actions';
import { history } from '../../utils/history';
import * as _ from "lodash"
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
          <DialogContent hidden={props.type=='delete'}>
            Incomplete Profile:
            <DialogContentText>
            {_.map(props.authentication.payload, (value, i) =>{
              if(value === undefined || value === "" || value === null || (i=='isSetPassword' && !value))
              return (
                <Typography variant="h6" color="initial" className="ml-3">
                  {_.upperFirst(i=='isSetPassword'?'password':i)}
                </Typography>
              )
            } )}
            </DialogContentText>
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
