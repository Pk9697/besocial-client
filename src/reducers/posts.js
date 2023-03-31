import {
	CREATE_COMMENT_SUCCESS,
	CREATE_POST_SUCCESS,
	TOGGLE_COMMENT_LIKE_SUCCESS,
	TOGGLE_POST_LIKE_SUCCESS,
	UPDATE_POSTS,
} from '../actions/actionTypes'

export const likesReducer = (state = [], action) => {
	switch (action.type) {
		case TOGGLE_COMMENT_LIKE_SUCCESS:
		case TOGGLE_POST_LIKE_SUCCESS: {
			return !action.payload.deleted
				? [action.payload.newLike, ...state]
				: state.filter((like) => like._id !== action.payload.existingLike._id)
		}
		default:
			return state
	}
}

export const commentsReducer = (state = [], action) => {
	switch (action.type) {
		case CREATE_COMMENT_SUCCESS: {
			return [action.payload.comment, ...state]
		}
		case TOGGLE_COMMENT_LIKE_SUCCESS: {
			return state.map((comment) =>
				comment._id === action.payload.commentId
					? {
							...comment,
							likes: likesReducer(comment.likes, action),
					  }
					: comment
			)
		}
		default:
			return state
	}
}

export const postsReducer = (state = [], action) => {
	switch (action.type) {
		case UPDATE_POSTS: {
			return action.payload
		}
		case CREATE_POST_SUCCESS: {
			return [action.payload, ...state]
		}
		case CREATE_COMMENT_SUCCESS: {
			return state.map((post) =>
				post._id === action.payload.postId
					? {
							...post,
							comments: commentsReducer(post.comments, action),
					  }
					: post
			)
		}
		case TOGGLE_POST_LIKE_SUCCESS: {
			return state.map((post) =>
				post._id === action.payload.postId
					? {
							...post,
							likes: likesReducer(post.likes, action),
					  }
					: post
			)
		}
		case TOGGLE_COMMENT_LIKE_SUCCESS: {
			return state.map((post) =>
				post._id === action.payload.postId
					? {
							...post,
							comments: commentsReducer(post.comments, action),
					  }
					: post
			)
		}
		default:
			return state
	}
}
