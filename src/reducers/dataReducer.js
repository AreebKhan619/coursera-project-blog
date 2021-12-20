import { CLEAR_CURRENT_POST, FETCH_BLOGS, FETCH_COMMENTS, SET_CURRENT_POST, SET_SEARCH_TEXT } from "../common/actionTypes";
import getUsernameFromId from "../common/functions/getUsernameFromId";

const initDataState = {
    posts: [],
    users: [],
    currentPost: null,
    currentPostComments: null,
    searchText: ""
}

const dataReducer = (state = initDataState, action) => {
    switch (action.type) {
        case FETCH_BLOGS:
            const { posts, users } = action.payload.data
            let postsWithUserInfo = posts.map(el => ({
                ...el,
                ...getUsernameFromId(el.userId, users)
            }))
            return {
                ...state,
                posts: postsWithUserInfo,
                allPosts: postsWithUserInfo,
                users
            }

        case FETCH_COMMENTS:
            return {
                ...state,
                currentPostComments: action.payload.data
            }

        case SET_CURRENT_POST:
            return {
                ...state,
                currentPost: action.payload.data
            }
        case CLEAR_CURRENT_POST:
            return {
                ...state,
                currentPost: null,
                currentPostComments: null
            }
        case SET_SEARCH_TEXT:
            return {
                ...state,
                searchText: action.payload.data
            }
        default:
            break;
    }
    return state
}


export default dataReducer