import {
	CLEAR_SEARCH_STATE,
	SEARCH_USER_ERROR,
	SEARCH_USER_START,
	SEARCH_USER_SUCCESS,
} from '../actions/actionTypes'

const initialState = {
	users: [],
	inProgress: false,
	isError: false,
}

export const searchReducer = (state = initialState, action) => {
	switch (action.type) {
		case SEARCH_USER_START:
			return {
				...state,
				users: [],
				inProgress: true,
				isError: false,
			}
		case SEARCH_USER_SUCCESS:
			return {
				...state,
				users: action.payload.users,
				inProgress: false,
				isError: false,
			}
		case SEARCH_USER_ERROR:
			return {
				...state,
				users: [],
				inProgress: false,
				isError: true,
			}

		case CLEAR_SEARCH_STATE:
			return {
				users: [],
				inProgress: false,
				isError: false,
			}
		default:
			return state
	}
}
