import {
	ADD_FRIEND_ERROR,
	ADD_FRIEND_SUCCESS,
	CLEAR_FRIEND_STATE,
	FETCH_USER_FRIENDS_ERROR,
	FETCH_USER_FRIENDS_SUCCESS,
} from '../actions/actionTypes'
const initialState = {
	friendsArr: [],
	error: null,
	success: null,
}
export const friendsReducer = (state = [], action) => {
	switch (action.type) {
		case FETCH_USER_FRIENDS_SUCCESS: {
			return {
				...state,
				friendsArr: [...action.payload],
				error: null,
			}
		}
		case FETCH_USER_FRIENDS_ERROR: {
			return {
				...state,
				friendsArr: [],
				error: action.payload,
			}
		}
		case ADD_FRIEND_SUCCESS: {
			return {
				...state,
				friendsArr: [action.payload, ...state.friendsArr],
				error: null,
				success: true,
			}
		}
		case ADD_FRIEND_ERROR: {
			return {
				...state,
				error: action.payload,
				success: null,
			}
		}

		case CLEAR_FRIEND_STATE: {
			return {
				...state,
				error: null,
				success: null,
			}
		}

		default:
			return state
	}
}
