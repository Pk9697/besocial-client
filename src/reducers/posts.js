import { UPDATE_POSTS } from '../actions/actionTypes'

export const postsReducer = (state = [], action) => {
	switch (action.type) {
		case UPDATE_POSTS: {
			return action.payload
		}
		default:
			return state
	}
}
