import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { activityActions } from '../../store/action/activity.actions';
import { history } from '../../utils/history';
import { profileCheck } from '../../utils/profile-checker';
import * as _ from "lodash"
import { HtmlTooltip } from '../Tooltip/HTMLTooltip';
import InfoIcon from '@material-ui/icons/Info';
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
        <DialogTitle id="form-dialog-title">{props.dialogTitle?props.dialogTitle:'Are you sure to perform this action?'}</DialogTitle>
        {/* Please mock your content */}
        <form id="my-form-id" onSubmit={handleSubmit}>
          <DialogContent hidden={props.type=='delete'}>
            
            <DialogContentText>
                <HtmlTooltip
                title={
                  <React.Fragment>
                  {_.map(profileCheck, (value, i) =>{
                    if(props.authentication.payload[value] === undefined || props.authentication.payload[value] === "" || props.authentication.payload[value] === null || (value=='isSetPassword' && !props.authentication.payload[value]))
                    return (
                    <Typography color="inherit">
                       {_.upperFirst(value=='isSetPassword'?'password':value)}
                    </Typography>
                      )
                    } )}
                  </React.Fragment>
                }
              >
                <div className="d-flex w-50">

                <InfoIcon color="primary"/>
                <Typography variant="body1">
                  Incomplete Profile
                </Typography>
                </div>
              </HtmlTooltip>
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
