import { Button, Grid, TextField } from '@material-ui/core';

export function FormPassword(props) {
  return (
    <>
      <div className={"form-group col-12"} hidden={(props.isRegister || props.hide) || (props.payload&&!props.payload.isSetPassword)}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required={!props.isRegister && !props.hide}
            fullWidth
            name={props.isRegister && props.payload && props.payload.salt && props.payload.hash?'':'recentPassword'}
            label="Recent Password"
            type="password"
            id={props.isRegister && props.payload && props.payload.salt && props.payload.hash?'':'recentPassword'}
            value={props.isRegister && props.payload && props.payload.salt && props.payload.hash?'':props.recentPassword}
            onChange={props.isRegister && props.payload && props.payload.salt && props.payload.hash?'':props.onChange}
            autoComplete="current-password"
          />
        </Grid>
      </div>
      <div className={"form-group col-12"} hidden={props.hide}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required={!props.hide}
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            name="password"
            value={props.password}
            onChange={props.onChange}
            autoComplete="current-password"
          />
        </Grid>
      </div>
      <div className={"form-group col-12"} hidden={props.hide}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required={!props.hide}
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={props.confirmPassword}
            onChange={props.onChange}
            helperText={
              props.confirmPassword &&
              props.password !== props.confirmPassword &&
              "Password mismatch"
            }
            error={
              props.confirmPassword && props.password !== props.confirmPassword
            }
          />
        </Grid>
      </div>

      <div className="container" hidden={props.isRegister || props.hide}>
        <Button  onClick={()=>props.submitChangePassword()} variant="contained" color="primary" className="float-left mt-2 mb-4">
          Change password
        </Button>
      </div>
    </>
  );
}
