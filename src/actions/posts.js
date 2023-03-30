import { notify } from '../helpers/commonFunctions'
import { APIUrls } from '../helpers/urls'
import {
	UPDATE_POSTS,
	FETCH_POSTS_ERROR,
	CREATE_POST_SUCCESS,
	CREATE_COMMENT_SUCCESS,
	TOGGLE_POST_LIKE_SUCCESS,
} from './actionTypes'

export function fetchPosts() {
	return (dispatch) => {
		const url = APIUrls.fetchPosts()
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

export function createPost(formFields, bearer) {
	return (dispatch) => {
		const url = APIUrls.createPost()
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

export function toggleLike(id, type, bearer) {
	return (dispatch) => {
		const url = APIUrls.toggleLike(id, type)
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
						dispatch(togglePostLikeSuccess({ ...data.data, postId: id }))
					}
				} else {
					notify({ type: 'error', msg: data.message })
				}
			})
	}
}
