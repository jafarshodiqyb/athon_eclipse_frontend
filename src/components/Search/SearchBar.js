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
import * as _ from 'lodash'
import { history } from "../../utils/history";

export function SearchBar(props) {
  const classes = useStyles()
  const [value, setValue] = useState(props.value);
  const [inputValue, setInputValue] = useState("");
  return (
    <div className={classes.search}>
      <IconButton hidden={props.hide} onClick={()=>history.push('/')} aria-label="add to favorites" className="mr-4">
        <ArrowBackIcon  />
      </IconButton>
      <Autocomplete
        value={value}
        onChange={(event, newValue,reason) => {
          setValue(newValue)
          console.log(newValue,reason)
          if(reason==='select-option' ){
            history.push("/"+newValue)
          }   
        }}
        // inputValue={inputValue}
        // onInputChange={(event, newInputValue,reason) => {
        //   setInputValue(newInputValue)
        //   console.log('i',newInputValue,reason)
        //   if(reason==='select-option'){
        //     history.push("/"+inputValue)
        //   }   
        // }}
        id="controllable-states-demo"
        options={_.map(props.hashtag.item, 'hashtag')}
        // options={options}
        // style={{ width: 300 }}
        fullWidth
        renderInput={(params) => (
          <TextField {...params} label="Search" variant="outlined" />
        )}
      />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  search: {
    display : 'flex',
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
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
    // vertical padding + font size from searchIcon
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
