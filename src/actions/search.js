import { notify } from '../helpers/commonFunctions'
import { APIUrls } from '../helpers/urls'
import {
	CLEAR_SEARCH_STATE,
	SEARCH_USER_ERROR,
	SEARCH_USER_START,
	SEARCH_USER_SUCCESS,
} from './actionTypes'

export function clearSearchState() {
	return {
		type: CLEAR_SEARCH_STATE,
	}
}

export function searchUserStart() {
	return {
		type: SEARCH_USER_START,
	}
}

export function searchUserSuccess(data) {
	return {
		type: SEARCH_USER_SUCCESS,
		payload: data,
	}
}

export function searchUserError() {
	return {
		type: SEARCH_USER_ERROR,
	}
}

export function searchUser(searchText, bearer) {
	return (dispatch) => {
		dispatch(searchUserStart())
		const url = APIUrls.searchUser(searchText)
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
					dispatch(searchUserSuccess(data.data))
				} else {
					dispatch(searchUserError())
					notify({ type: 'error', msg: data.message })
				}
			})
	}
}
