import React, { useEffect } from "react";
import { connect } from "react-redux";
import { FeedCard } from "../../../components/Card/FeedCard";
import { StoriesFeed } from "../../../components/Card/StoriesCard";
import { PostFeed } from "../../../components/Form/PostFeed";
import { storiesActions } from "../../../store/action/stories.actions";
import { userActions } from "../../../store/action/user.actions";
import queryString from "query-string";
import * as _ from "lodash";
import { SearchBar } from "../../../components/Search/SearchBar";
function Content(props) {
  let params = props.location.hash;
  let content;
  let feed = props.posts.user
  if (!params) {
    content = (
      <div>
        <StoriesFeed {...props} />
        <PostFeed {...props} />
        <FeedCard feed={feed} />
      </div>
    );
  } else if (props.posts && params) {
    const filterHashtag = _.filter(props.posts.user, function (item) {
      return item.posts.content.indexOf(params) > -1;
    });
    content = (
      <div>
        <SearchBar value={params} {...props}/>
        <FeedCard feed={filterHashtag} />
      </div>
    );
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
