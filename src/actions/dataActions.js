import axios from "axios";
import { CLEAR_CURRENT_POST, FETCH_BLOGS, FETCH_COMMENTS, SET_CURRENT_POST, SET_ERROR, SET_LOADING_FALSE, SET_LOADING_TRUE } from "../common/actionTypes";

export const getBlogs = () => async (dispatch) => {
    await dispatch({ type: SET_LOADING_TRUE });
    const postsRequests = axios.get("/posts");
    const usersRequests = axios.get("/users");
    try {
        const [postsResponse, usersResponse] = await axios.all([postsRequests, usersRequests])
        return dispatch({
            type: FETCH_BLOGS,
            payload: {
                data: {
                    posts: postsResponse.data,
                    users: usersResponse.data
                },
            },
        });
    } catch (error) {
        return dispatch({
            type: SET_ERROR, error
        });
    } finally {
        dispatch({
            type: SET_LOADING_FALSE
        })
    }
};

export const getOnePost = async (postId) => {
    const postsResponse = await axios.get('/posts?id=' + postId)
    document.title = postsResponse.data[0].title
    return (postsResponse.data[0])
}

export const getComments = (postId) => async (dispatch, getState) => {
    try {
        if (!getState().data.currentPost) {
            // window.alert("post doesn't exist")
            dispatch({
                type: SET_CURRENT_POST,
                payload: {
                    data: await getOnePost(postId)
                }
            })
        }
        await dispatch({ type: SET_LOADING_TRUE });

        const commentsResponse = await axios.get("/comments?postId=" + postId)
        return dispatch({
            type: FETCH_COMMENTS,
            payload: {
                data: commentsResponse.data,
            },
        });
    } catch (error) {
        return dispatch({
            type: SET_ERROR, error
        });
    } finally {
        dispatch({
            type: SET_LOADING_FALSE
        })
    }
}

export const setCurrentPost = (postObject) => {
    document.title = postObject.title
    return ({
        type: SET_CURRENT_POST,
        payload: {
            data: postObject
        }
    })
}

export const clearCurrentPost = () => {
    return { type: CLEAR_CURRENT_POST }
}