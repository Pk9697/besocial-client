import { CREATE_COMMENT_SUCCESS, CREATE_POST_SUCCESS, UPDATE_POSTS } from '../actions/actionTypes'

export const postsReducer = (state = [], action) => {
	switch (action.type) {
		case UPDATE_POSTS: {
			return action.payload
		}
		case CREATE_POST_SUCCESS: {
			return [action.payload, ...state]
		}
		case CREATE_COMMENT_SUCCESS:{
			return state.map(post=>(
				post._id===action.payload.postId?
				{
					...post,
					comments:[action.payload.comment,...post.comments]
				}
				:
				post
			))
		}
		default:
			return state
	}
}
