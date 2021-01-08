import { Hidden } from '@material-ui/core';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PeopleIcon from '@material-ui/icons/People';
import React from 'react';

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    color: "white",
    backgroundColor: "#D4232C",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    display: "block",
    maxHeight: 300, 
    overflow: 'auto'
  },
}))(MuiAccordionDetails);

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing.unit,
    position: "fixed",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3,
    width: "15%",
  },
}));
export default function ChatBar() {
  const [expanded, setExpanded] = React.useState("");
  const classes = useStyles();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Hidden xsDown>
      <Accordion
        className={classes.root}
        square
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>
            {" "}
            <PeopleIcon /> Friends online (5)
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {people.map((value, i) => {
            return (
              <List >
                <ListItem button alignItems="flex-start">
                  <ListItemAvatar>
                  <Avatar >
                      {value.name.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={value.name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          Programmer
                        </Typography>
                        {/* {" — I'll be in your neighborhood doing errands this…"} */}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </List>
            );
          })}
        </AccordionDetails>
      </Accordion>
      </Hidden>
    </div>
  );
}

const people = [
  {
    name: `Ja'far Shodiq YB`,
  },
  {
    name: "Arifin MZ",
  },
  {
    name: "Rizaldy Pahlevi",
  },
  {
    name: "Adit",
  },
  {
    name: "Hervin Alkaff",
  },
];
