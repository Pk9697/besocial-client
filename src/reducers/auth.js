import {
	AUTHENTICATE_USER,
	CLEAR_ERROR_STATE,
	EDIT_USER_FAILED,
	EDIT_USER_SUCCESSFUL,
	LOGIN_ERROR,
	LOGIN_START,
	LOGIN_SUCCESS,
	LOG_OUT,
	REGISTER_ERROR,
	REGISTER_START,
	REGISTER_SUCCESS,
} from '../actions/actionTypes'

const initialState = {
	user: {},
	token: null,
	error: null,
	isLoggedIn: false,
	inProgress: false,
}
export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case CLEAR_ERROR_STATE: {
			return {
				...state,
				error: null,
			}
		}
		case LOGIN_START:
		case REGISTER_START: {
			return {
				...state,
				inProgress: true,
				user: {},
				token: null,
				isLoggedIn: false,
				error: null,
			}
		}
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS: {
			return {
				...state,
				user: action.payload.user,
				token: action.payload.token,
				isLoggedIn: true,
				inProgress: false,
				error: null,
			}
		}
		case LOGIN_ERROR:
		case REGISTER_ERROR: {
			return {
				...state,
				error: action.payload,
				user: {},
				token: null,
				inProgress: false,
				isLoggedIn: false,
			}
		}

		case AUTHENTICATE_USER: {
			return {
				...state,
				inProgress: false,
				user: action.payload.user,
				token: action.payload.token,
				isLoggedIn: true,
				error: null,
			}
		}

		case LOG_OUT: {
			return {
				...state,
				inProgress: false,
				user: {},
				token: null,
				isLoggedIn: false,
				error: null,
			}
		}

		case EDIT_USER_SUCCESSFUL:{
			return {
				...state,
				user:action.payload.user,
				token:action.payload.token,
				inProgress: false,
				isLoggedIn: true,
				error: false,
			}
		}

		case EDIT_USER_FAILED:{
			return {
				...state,
				error: action.payload
			}
		}

		default:
			return state
	}
}
