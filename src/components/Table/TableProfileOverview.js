import * as React from "react";
import { Typography, Divider, Button } from "@material-ui/core";
// import { DataGrid } from '@material-ui/data-grid';
export default function TableProfileOverview(props) {
  const {user} = props.authentication
  console.log(user)
  const moveToEdit = (e) =>{
    props.onChange(e)
  }
  return (
    <div>
      <Typography
        variant="h6"
        color="textPrimary"
        component="p"
        className="mt-4 text-left"
      >
        Profile
      </Typography>
      <div style={{ marginTop: "2em" }}>
      <div className="row mt-3 mb-3">
          <div className="col-md-6 text-left">
            <Typography variant="span" color="textSecondary">
              Username
            </Typography>
          </div>
          <div className="col-md-6 text-left ">
            <Typography variant="span" color="textPrimary">
              {user?user.username:''}
            </Typography>
          </div>
        </div>
        <Divider />
        <div className="row mt-3 mb-3">
          
          <div className="col-md-6 text-left">
            <Typography variant="span" color="textSecondary">
              First Name
            </Typography>
          </div>
          <div className="col-md-6 text-left ">
            <Typography variant="span" color="textPrimary">
              {user?user.firstName:''}
            </Typography>
          </div>
        </div>
        <Divider />

        <div className="row mt-3 mb-3">
          <div className="col-md-6 text-left">
            <Typography variant="span" color="textSecondary">
              Last Name
            </Typography>
          </div>
          <div className="col-md-6 text-left ">
            <Typography variant="span" color="textPrimary">
              {user?user.lastName:''}
            </Typography>
          </div>
        </div>
        <Divider />
        
        <div className="row mt-3 mb-3">
          <div className="col-md-6 text-left">
            <Typography variant="span" color="textSecondary">
              Address
            </Typography>
          </div>
          <div className="col-md-6 text-left ">
            <Typography variant="span" color="textPrimary">
              {user?user.address:''}
            </Typography>
          </div>
        </div>
        <Divider />
        <div className="row mt-3 mb-3">
          <div className="col-md-6 text-left">
            <Typography variant="span" color="textSecondary">
              Motto
            </Typography>
          </div>
          <div className="col-md-6 text-left ">
            <Typography variant="span" color="textPrimary">
              {user?user.motto:''}
            </Typography>
          </div>
        </div>
        <Divider />
      </div>
      <div className="row mt-4">
        <div className="col text-left">
        <Button  index={1} onClick={(e)=>moveToEdit(e)}variant="contained" color="primary">
          Edit Profile
        </Button>
        </div>
      </div>
    </div>
  );
}
