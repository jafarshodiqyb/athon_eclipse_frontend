import React, { useEffect } from "react";
import { connect } from "react-redux";
import { FeedCard } from "../../../components/Card/FeedCard";
import { StoriesFeed } from "../../../components/Card/StoriesCard";
import { PostFeed } from "../../../components/Form/PostFeed";
import { storiesActions } from "../../../store/action/stories.actions";
import { userActions } from "../../../store/action/user.actions";
import queryString from "query-string";

function Content(props) {
  let params = props.location.hash;
  let content;
  if (!params) {
    content = (
      <div>
        <StoriesFeed {...props} />
        <PostFeed {...props} />
        <FeedCard {...props} />
      </div>
    );
  } else {
    //render hashtagpost
    content = <div>
      
    </div>;
  }
  return <div>{content}</div>;
}

function mapStateToProps(state) {
  return state;
}
const mapDispatchToProps = {
  getAllStories: storiesActions.getAllStories,
  changeImage: userActions.changeImage,
  postStories: storiesActions.postStories,
};

const connectedStories = connect(mapStateToProps, mapDispatchToProps)(Content);
export { connectedStories as Content };
