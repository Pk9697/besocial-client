import {
	CREATE_COMMENT_SUCCESS,
	CREATE_POST_SUCCESS,
	TOGGLE_COMMENT_LIKE_SUCCESS,
	TOGGLE_POST_LIKE_SUCCESS,
	UPDATE_POSTS,
} from '../actions/actionTypes'

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
							comments: [action.payload.comment, ...post.comments],
					  }
					: post
			)
		}
		case TOGGLE_POST_LIKE_SUCCESS: {
			return state.map((post) =>
				post._id === action.payload.postId
					? {
							...post,
							likes: !action.payload.deleted
								? [action.payload.newLike, ...post.likes]
								: post.likes.filter(
										(like) => like._id !== action.payload.existingLike._id
								  ),
					  }
					: post
			)
		}
		case TOGGLE_COMMENT_LIKE_SUCCESS: {
			return state.map((post) =>
				post._id === action.payload.postId
					? {
							...post,
							comments: post.comments.map((comment) =>
								comment._id === action.payload.commentId
									? {
											...comment,
											likes: !action.payload.deleted
												? [action.payload.newLike, ...comment.likes]
												: comment.likes.filter(
														(like) =>
															like._id !== action.payload.existingLike._id
												  ),
									  }
									: comment
							),
					  }
					: post
			)
		}
		default:
			return state
	}
}
