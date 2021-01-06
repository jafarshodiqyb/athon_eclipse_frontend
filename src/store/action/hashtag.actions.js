import { dispatchSelector } from "../../utils/dispatchSelector";
import { hashtagTypes } from "../type/hashtag.type";
import * as _ from "lodash"
import { after, reject } from "lodash";
const hashtagRegex = require("hashtag-regex");
export const hashtagActions = {
  findHashtag,
};

function doSomething() {
    // some async operation that returns a promise
}

function afterfound(posts) {
    const regex = hashtagRegex();
    let match;
    let find = {};
    return new Promise((resolve,reject)=>{
        if(posts.user){
            posts.user.map((value, i) => {
                while ((match = regex.exec(value.posts.content))) {
                  const hashtag = match[0];
                  if (!_.isEmpty(find) && find[hashtag]) {
                    find[hashtag].count = find[hashtag].count + 1;
                    // find[hashtag].count = find[hashtag].count++;
                  } else {
                    find[hashtag] = {
                      hashtag: hashtag,
                      count: 1,
                    };
                  }
                }
              });
        }
          resolve(find)
    })
}

function findHashtag(posts) {
  return (dispatch) => {
    
    dispatch(dispatchSelector.request(posts, hashtagTypes.HASHTAG_REQUEST));
    afterfound(posts)
        .then((res,err)=>{
            if(res){
                  dispatch(dispatchSelector.success(res, hashtagTypes.HASHTAG_SUCCESS));
            } else {
                dispatch(dispatchSelector.failure(err, hashtagTypes.HASHTAG_SUCCESS));
            }
        })

    }
}
