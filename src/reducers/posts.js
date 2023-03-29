import { CREATE_POST_SUCCESS, UPDATE_POSTS } from '../actions/actionTypes'

export const postsReducer = (state = [], action) => {
	switch (action.type) {
		case UPDATE_POSTS: {
			return action.payload
		}
		case CREATE_POST_SUCCESS: {
			return [action.payload, ...state]
		}
		default:
			return state
	}
}
