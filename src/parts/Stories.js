import React, { useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@material-ui/core";
import { activityActions } from "../store/action/activity.actions";
import { connect } from "react-redux";
import ReactInstaStories from "react-insta-stories";
const stories = [
	{
		url: 'https://static.wixstatic.com/media/370a7e_8490be5524d94eb2b2b34ce9aa4603ef~mv2.png/v1/fill/w_1903,h_664,al_c,q_90,usm_0.66_1.00_0.01/370a7e_8490be5524d94eb2b2b34ce9aa4603ef~mv2.webp',
    duration: 5000,
    header: {
			heading: 'Mohit Karekar',
			subheading: 'Posted 30m ago',
			profileImage: 'https://picsum.photos/100/100',
		},
		// seeMore: SeeMore, // some component
	},

  {
		url: 'https://static.wixstatic.com/media/370a7e_8490be5524d94eb2b2b34ce9aa4603ef~mv2.png/v1/fill/w_1903,h_664,al_c,q_90,usm_0.66_1.00_0.01/370a7e_8490be5524d94eb2b2b34ce9aa4603ef~mv2.webp',
    duration: 5000,
    header: {
			heading: 'Mohit Karekar',
			subheading: 'Posted 30m ago',
			profileImage: 'https://picsum.photos/100/100',
		},
		// seeMore: SeeMore, // some component
	},
	{
		url: 'https://static.wixstatic.com/media/370a7e_8490be5524d94eb2b2b34ce9aa4603ef~mv2.png/v1/fill/w_1903,h_664,al_c,q_90,usm_0.66_1.00_0.01/370a7e_8490be5524d94eb2b2b34ce9aa4603ef~mv2.webp',
    duration: 2000,
    header: {
			heading: 'Mohit Karekar',
			subheading: 'Posted 30m ago',
			profileImage: 'https://picsum.photos/100/100',
		},
	},
];
function Stories(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
    return (
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <ReactInstaStories
          stories={stories}
          defaultInterval={1500}
          width={432}
          height={768}
          onAllStoriesEnd={handleClose}
          keyboardNavigation={true}
        />
      </Dialog>
    );
}

function mapState(state) {
  return state;
}
const actionCreators = {

  addActivity: activityActions.addActivity,
  updateActivity : activityActions.updateActivity,
  deleteActivity: activityActions.deleteActivity,
};

const connectedDialog = connect(mapState, actionCreators)(Stories);
export { connectedDialog as Stories };
