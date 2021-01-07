import { hashtagTypes } from '../type/hashtag.type';
import { alertTypes } from './../type/alert.type';
import * as _ from "lodash"
const hashtagRegex = require("hashtag-regex");
export function hashtag(state = {}, action) {
  switch (action.type) {
    case hashtagTypes.HASHTAG_REQUEST:
      return {
        // user: action.payload
      };
    case hashtagTypes.HASHTAG_SUCCESS:
      return {
        // checkin: true,
        ...state,item: afterfound(action.payload)
      };
    case hashtagTypes.HASHTAG_FAILURE:
      return {};
    // case checkTypes.LOGOUT:
    //   return {};
    default:
      return state
  }
}

function afterfound(posts) {
    const regex = hashtagRegex();
    let match;
    let find = [];
    // return new Promise((resolve,reject)=>{
        if(posts){
            posts.map((value, i) => {
                while ((match = regex.exec(value.posts.content))) {
                  const hashtag = match[0];
                  let index = _.findIndex(find,function(o) { return o.hashtag.toLowerCase() == hashtag.toLowerCase(); })
                  if (index !== -1 ) {
                    find[index].count = find[index].count + 1;
                    // find[hashtag].count = find[hashtag].count++;
                  } else {
                    find.push({
                      hashtag: hashtag,
                      count: 1})
                    };
                  }
                });
        }
          return(find)
    // })
}
