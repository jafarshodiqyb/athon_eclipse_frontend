import { Button, Divider, Typography } from '@material-ui/core';
import * as React from 'react';

// import { DataGrid } from '@material-ui/data-grid';
export default function TableProfileOverview(props) {
  const {payload} = props.authentication
  const moveToEdit = (e) =>{
    props.onChange(e)
  }
  return (
    <div className="p-4">
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
              {payload?payload.username:''}
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
              {payload?payload.firstName:''}
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
              {payload?payload.lastName:''}
            </Typography>
          </div>
        </div>
        <Divider />
        <div className="row mt-3 mb-3">
          <div className="col-md-6 text-left">
            <Typography variant="span" color="textSecondary">
              Email
            </Typography>
          </div>
          <div className="col-md-6 text-left ">
            <Typography variant="span" color="textPrimary">
              {payload?payload.email:''}
            </Typography>
          </div>
        </div>
        <Divider />
        <div className="row mt-3 mb-3">
          <div className="col-md-6 text-left">
            <Typography variant="span" color="textSecondary">
              Job
            </Typography>
          </div>
          <div className="col-md-6 text-left ">
            <Typography variant="span" color="textPrimary">
              {payload?payload.job:''}
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
              {payload?payload.address:''}
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
              {payload?payload.motto:''}
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
