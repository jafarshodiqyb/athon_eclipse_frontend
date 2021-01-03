import { Grid, TextField } from "@material-ui/core";

export function FormPassword(props) {
  console.log(props);
  return (
    <div style={{ all: "inherit", margin: 0 }}>
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
            //   defaultValue={props.confirmPassword && (props.password!==props.confirmPassword)}
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
    </div>
  );
}
