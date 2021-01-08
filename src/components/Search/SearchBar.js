import {
  fade,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  makeStyles,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import InputBase from "@material-ui/core/InputBase";
import { AccountCircle } from "@material-ui/icons";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Autocomplete } from "@material-ui/lab";
import { useState } from "react";
import * as _ from "lodash";
import { history } from "../../utils/history";

export function SearchBar(props) {
  const classes = useStyles();
  const [value, setValue] = useState(props.value);
  const [inputValue, setInputValue] = useState("");
  return (
    <div className={classes.search}>
      <IconButton
        hidden={props.hide}
        onClick={() => history.push("/")}
        aria-label="add to favorites"
        className="mr-4"
      >
        <ArrowBackIcon />
      </IconButton>
      <Autocomplete
        value={value}
        onChange={(event, newValue, reason) => {
          setValue(newValue);
          if (reason === "select-option") {
            history.push("/" + newValue);
          }
        }}
        id="controllable-states-demo"
        options={_.map(props.hashtag.item, "hashtag")}
        fullWidth
        renderInput={(params) =>
          props.hide ? (
            <div ref={params.InputProps.ref}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                {...params.inputProps}
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          ) : (
            <TextField
              {...params}
              color="primary"
              label="Search"
              variant={props.hide ? "filled" : "outlined"}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          )
        }
      />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  search: {
    display: "flex",
    position: "relative",
    color: "white",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  square: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: "#D4232C",
    margin: "0 auto",
  },
}));
