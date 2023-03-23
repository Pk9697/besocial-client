import {
	FETCH_USER_PROFILE_ERROR,
	FETCH_USER_PROFILE_START,
	FETCH_USER_PROFILE_SUCCESS,
} from '../actions/actionTypes'

const initialState = {
	user: {},
	error: null,
	success: null,
	inProgress: false,
}

export const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_USER_PROFILE_START: {
			return {
				...state,
				user: {},
				error: null,
				success: null,
				inProgress: true,
			}
		}
		case FETCH_USER_PROFILE_SUCCESS: {
			return {
				...state,
				user: action.payload,
				error: null,
				success: true,
				inProgress: false,
			}
		}
		case FETCH_USER_PROFILE_ERROR: {
			return {
				...state,
				user: {},
				error: action.payload,
				success: false,
				inProgress: false,
			}
		}
        default: return state
	}
}
