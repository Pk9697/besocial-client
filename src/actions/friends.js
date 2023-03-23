import { APIUrls } from '../helpers/urls'
import {
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
                // console.log(data)
				if (data.success) {
					dispatch(fetchUserFriendsSuccess(data.data.friends))
				}else{
                    dispatch(fetchUserFriendsError(data.message))
                }
			})
	}
}
