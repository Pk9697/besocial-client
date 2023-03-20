import { APIUrls } from '../helpers/urls'
import { FETCH_ALL_USERS, UPDATE_ALL_USERS } from './actionTypes'

export function fetchAllUsers(bearer) {
	return (dispatch) => {
		const url = APIUrls.fetchAllUsers()
		fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${bearer}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				dispatch(updateAllUsers(data.data.users))
			})
	}
}

export function updateAllUsers(users) {
	return {
		type: UPDATE_ALL_USERS,
		payload: users,
	}
}
