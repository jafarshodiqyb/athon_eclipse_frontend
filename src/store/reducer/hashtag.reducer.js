import { hashtagTypes } from '../type/hashtag.type';
import { alertTypes } from './../type/alert.type';
import * as _ from "lodash"
const hashtagRegex = require("hashtag-regex");
export function hashtag(state = {}, action) {
  switch (action.type) {
    case hashtagTypes.HASHTAG_REQUEST:
      return {
      };
    case hashtagTypes.HASHTAG_SUCCESS:
      return {
        ...state,item: afterfound(action.payload)
      };
    case hashtagTypes.HASHTAG_FAILURE:
      return {};

    default:
      return state
  }
}

function afterfound(posts) {
    const regex = hashtagRegex();
    let match;
    let find = [];
        if(posts){
            posts.map((value, i) => {
                while ((match = regex.exec(value.posts.content))) {
                  const hashtag = match[0];
                  let index = _.findIndex(find,function(o) { return o.hashtag.toLowerCase() == hashtag.toLowerCase(); })
                  if (index !== -1 ) {
                    find[index].count = find[index].count + 1;
                  } else {
                    find.push({
                      hashtag: hashtag,
                      count: 1})
                    };
                  }
                });
        }
          return(find)
}
