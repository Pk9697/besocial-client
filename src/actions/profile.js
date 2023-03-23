import { APIUrls } from '../helpers/urls'
import {
	FETCH_USER_PROFILE_ERROR,
	FETCH_USER_PROFILE_START,
	FETCH_USER_PROFILE_SUCCESS,
} from './actionTypes'

export function fetchUserProfileStart() {
	return {
		type: FETCH_USER_PROFILE_START,
	}
}

export function fetchUserProfileSuccess(user) {
	return {
		type: FETCH_USER_PROFILE_SUCCESS,
		payload: user,
	}
}

export function fetchUserProfileError(errMsg) {
	return {
		type: FETCH_USER_PROFILE_ERROR,
		payload: errMsg,
	}
}

export function fetchUserProfile(userId, bearer) {
	return (dispatch) => {
		dispatch(fetchUserProfileStart())

		const url = APIUrls.fetchUserProfile(userId)

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
					dispatch(fetchUserProfileSuccess(data.data.user))
				} else {
					dispatch(fetchUserProfileError(data.message))
				}
			})
	}
}
