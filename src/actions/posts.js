import { notify } from '../helpers/commonFunctions'
import { APIUrls } from '../helpers/urls'
import {
	UPDATE_POSTS,
	FETCH_POSTS_ERROR,
	CREATE_POST_SUCCESS,
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
				'Authorization': `Bearer ${bearer}`,
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
