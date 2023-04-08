import { notify } from '../helpers/commonFunctions'
import { APIUrls } from '../helpers/urls'
import {
	UPDATE_POSTS,
	FETCH_POSTS_ERROR,
	CREATE_POST_SUCCESS,
	CREATE_COMMENT_SUCCESS,
	TOGGLE_POST_LIKE_SUCCESS,
	TOGGLE_COMMENT_LIKE_SUCCESS,
	DELETE_POST_SUCCESS,
	DELETE_COMMENT_SUCCESS,
	CLEAR_POSTS_STATE,
} from './actionTypes'

export function fetchAllPosts() {
	return (dispatch) => {
		const url = APIUrls.fetchAllPosts()
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				// console.log(data)
				if (data.success) {
					dispatch(updatePosts(data.data.posts))
				} else {
					dispatch({
						type: FETCH_POSTS_ERROR,
					})
				}
			})
	}
}

export function fetchUserPosts(userId, bearer) {
	return (dispatch) => {
		const url = APIUrls.fetchUserPosts(userId)
		fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${bearer}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					dispatch(updatePosts(data.data.posts))
				} else {
					notify({ type: 'error', msg: data.message })
				}
			})
	}
}

export function clearPostsState() {
	return {
		type: CLEAR_POSTS_STATE,
	}
}

export function updatePosts(posts) {
	return {
		type: UPDATE_POSTS,
		payload: posts,
	}
}

export function createPostSuccess(post) {
	return {
		type: CREATE_POST_SUCCESS,
		payload: post,
	}
}

export function createPost(formData, bearer) {
	return (dispatch) => {
		const url = APIUrls.createPost()
		fetch(url, {
			method: 'POST',
			headers: {
				// 'Content-Type': 'application/json',
				Authorization: `Bearer ${bearer}`,
			},
			body: formData,
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data)
				if (data.success) {
					dispatch(createPostSuccess(data.data.post))
					notify({ type: 'success', msg: data.message })
				} else {
					notify({ type: 'error', msg: data.message })
				}
			})
	}
}
export function createCommentSuccess(data) {
	return {
		type: CREATE_COMMENT_SUCCESS,
		payload: data,
	}
}

export function createComment(formFields, bearer) {
	return (dispatch) => {
		const url = APIUrls.createComment()
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${bearer}`,
			},
			body: JSON.stringify(formFields),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data)
				if (data.success) {
					dispatch(
						createCommentSuccess({
							comment: data.data.comment,
							postId: formFields.postId,
						})
					)
					notify({ type: 'success', msg: data.message })
				} else {
					notify({ type: 'error', msg: data.message })
				}
			})
	}
}

export function togglePostLikeSuccess(data) {
	return {
		type: TOGGLE_POST_LIKE_SUCCESS,
		payload: data,
	}
}
export function toggleCommentLikeSuccess(data) {
	return {
		type: TOGGLE_COMMENT_LIKE_SUCCESS,
		payload: data,
	}
}

export function toggleLike({ postId, commentId, type, bearer }) {
	return (dispatch) => {
		let url
		if (type === 'Post') {
			url = APIUrls.toggleLike(postId, type)
		} else if (type === 'Comment') {
			url = APIUrls.toggleLike(commentId, type)
		}
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${bearer}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data)
				if (data.success) {
					if (data.data.deleted) {
						notify({ type: 'success', msg: `${type} Like Removed ` })
					} else {
						notify({ type: 'success', msg: `${type} Liked ` })
					}
					if (type === 'Post') {
						dispatch(togglePostLikeSuccess({ ...data.data, postId }))
					} else if (type === 'Comment') {
						dispatch(
							toggleCommentLikeSuccess({ ...data.data, postId, commentId })
						)
					}
				} else {
					notify({ type: 'error', msg: data.message })
				}
			})
	}
}

export function deletePostSuccess(data) {
	return {
		type: DELETE_POST_SUCCESS,
		payload: data,
	}
}

export function deletePost(postId, bearer) {
	return (dispatch) => {
		const url = APIUrls.deletePost(postId)
		fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${bearer}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					dispatch(deletePostSuccess({ postId }))
					notify({ type: 'success', msg: data.message })
				} else {
					notify({ type: 'error', msg: data.message })
				}
			})
	}
}
export function deleteCommentSuccess(data) {
	return {
		type: DELETE_COMMENT_SUCCESS,
		payload: data,
	}
}

export function deleteComment(postId, commentId, postUserId, bearer) {
	return (dispatch) => {
		const url = APIUrls.deleteComment(commentId, postUserId)
		fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${bearer}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					dispatch(deleteCommentSuccess({ postId, commentId }))
					notify({ type: 'success', msg: data.message })
				} else {
					notify({ type: 'error', msg: data.message })
				}
			})
	}
}
