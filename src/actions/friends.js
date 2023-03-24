import { APIUrls } from '../helpers/urls'
import {
	ADD_FRIEND_ERROR,
	ADD_FRIEND_SUCCESS,
	CLEAR_FRIEND_STATE,
	FETCH_USER_FRIENDS_ERROR,
	FETCH_USER_FRIENDS_SUCCESS,
} from './actionTypes'

export function fetchUserFriendsSuccess(friends) {
	return {
		type: FETCH_USER_FRIENDS_SUCCESS,
		payload: friends,
	}
}
export function fetchUserFriendsError(errMsg) {
	return {
		type: FETCH_USER_FRIENDS_ERROR,
		payload: errMsg,
	}
}
export function fetchUserFriends(bearer) {
	return (dispatch) => {
		const url = APIUrls.fetchUserFriends()
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
					dispatch(fetchUserFriendsSuccess(data.data.friends))
				} else {
					dispatch(fetchUserFriendsError(data.message))
				}
			})
	}
}

export function addFriendSuccess(friendship) {
	return {
		type: ADD_FRIEND_SUCCESS,
		payload: friendship,
	}
}
export function addFriendError(errMsg) {
	return {
		type: ADD_FRIEND_ERROR,
		payload: errMsg,
	}
}

export function addFriend(userId, bearer) {
	return (dispatch) => {
		const url = APIUrls.addFriend(userId)
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${bearer}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success) {
					dispatch(addFriendSuccess(data.data.friendship))
				} else {
					dispatch(addFriendError(data.message))
				}
			})
	}
}

export function clearFriendState() {
	return {
		type: CLEAR_FRIEND_STATE,
	}
}
