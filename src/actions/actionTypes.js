//*Every request should have 3 actions Start (i.e for loading),Success and Error
export const UPDATE_POSTS = 'UPDATE_POSTS'
export const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR'

// login action types
export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOG_OUT = 'LOG_OUT'

//Authenticate user
//persist user
export const AUTHENTICATE_USER_START = 'AUTHENTICATE_USER_START'
export const AUTHENTICATE_USER_SUCCESS = 'AUTHENTICATE_USER_SUCCESS'

//register action types

export const REGISTER_START = 'REGISTER_START'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_ERROR = 'REGISTER_ERROR'

//clear auth state to remove err message once comp is destroyed
export const CLEAR_ERROR_STATE = 'CLEAR_ERROR_STATE'

//fetch all users
export const FETCH_ALL_USERS = 'FETCH_ALL_USERS'
export const UPDATE_ALL_USERS = 'UPDATE_ALL_USERS'

//edit user profile
export const EDIT_USER_SUCCESSFUL = 'EDIT_USER_SUCCESSFUL'
export const EDIT_USER_FAILED = 'EDIT_USER_FAILED'

//user profile
export const FETCH_USER_PROFILE_START = 'FETCH_USER_PROFILE_START'
export const FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS'
export const FETCH_USER_PROFILE_ERROR = 'FETCH_USER_PROFILE_ERROR'

//fetch user friends
export const FETCH_USER_FRIENDS_SUCCESS = 'FETCH_USER_FRIENDS_SUCCESS'
export const FETCH_USER_FRIENDS_ERROR = 'FETCH_USER_FRIENDS_ERROR'

//add/remove friend
export const ADD_FRIEND_SUCCESS = 'ADD_FRIEND_SUCCESS'
export const ADD_FRIEND_ERROR = 'ADD_FRIEND_ERROR'
export const REMOVE_FRIEND_SUCCESS = 'REMOVE_FRIEND_SUCCESS'
export const REMOVE_FRIEND_ERROR = 'REMOVE_FRIEND_ERROR'

export const CLEAR_FRIEND_STATE = 'CLEAR_FRIEND_STATE'

//add post
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS'
//add comment
export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS'

//toggle post like
export const TOGGLE_POST_LIKE_SUCCESS = 'TOGGLE_POST_LIKE_SUCCESS'
//toggle comment like
export const TOGGLE_COMMENT_LIKE_SUCCESS = 'TOGGLE_COMMENT_LIKE_SUCCESS'

//delete a post
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS'

//delete a comment
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS'

//search user
export const SEARCH_USER_START = 'SEARCH_USER_START'
export const SEARCH_USER_SUCCESS = 'SEARCH_USER_SUCCESS'
export const SEARCH_USER_ERROR = 'SEARCH_USER_ERROR'
export const CLEAR_SEARCH_STATE = 'CLEAR_SEARCH_STATE'

//fetch user posts
// export const FETCH_USER_POSTS_SUCCESS='FETCH_USER_POSTS_SUCCESS'
export const CLEAR_POSTS_STATE = 'CLEAR_POSTS_STATE'
